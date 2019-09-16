import React, { Component } from "react";
import Input from "./common/input";
import Select from "./common/select";
import Table from "./common/table";
import Joi from "joi-browser";
import _ from "lodash";
import { connect } from "react-redux";
import {
	getExpenseType,
	addExpenseType,
	updateExpenseType,
	deleteExpenseType
} from "./../actions/expenseType";
import Edit from "./common/edit";
import Delete from "./common/delete";

class ExpenseType extends Component {
	state = {
		id: "",
		newName: "",
		newNeed: "",
		options: ["Primary", "Secondary", "Misc"],
		columns: ["", "Type", "Need", "ID", ""],
		data: [],
		updateId: "",
		displayUpdate: false,
		displayAdd: true
	};

	schema = {
		newName: Joi.string().required(),
		newNeed: Joi.string()
			.min(3)
			.required()
	};

	getTableData = () => {
		const data = this.props.expenseTypes.map((eT, Id) => {
			return {
				editComp: (
					<Edit name={`edit${eT.id}`} onClick={() => this.handleEdit(eT.id)} />
				),
				...eT,
				trashComp: (
					<Delete
						name={`delete${eT.id}`}
						onClick={() => this.handleDelete(eT.id)}
					/>
				)
			};
		});
		this.setState({ data });
	};

	componentDidMount = () => {
		this.getTableData();
	};

	componentDidUpdate = prevProps => {
		if (this.props.expenseTypes !== prevProps.expenseTypes) {
			this.getTableData();
			getExpenseType();
		}
	};

	handleNameChange = event => {
		const newName = event.target.value;
		this.setState({ newName });
	};

	handleNeedChange = event => {
		const newNeed = event.target.value;
		this.setState({ newNeed });
	};

	handleAdd = () => {
		this.props.addExpenseType({
			name: _.startCase(this.state.newName),
			need: this.state.newNeed
		});
		this.setState({ newName: "", newNeed: "" });
	};

	handleUpdate = () => {
		console.log("id is ", this.state.id);
		this.props.updateExpenseType({
			name: _.startCase(this.state.newName),
			need: this.state.newNeed,
			id: this.state.id
		});

		this.setState({
			newName: "",
			newNeed: "",
			id: "",
			displayUpdate: false,
			displayAdd: true
		});
	};

	handleEdit = toBeEditedId => {
		console.log("handleEdit()- toBeEditedId", toBeEditedId);
		const expenseTypes = [...this.props.expenseTypes];
		const res = expenseTypes.filter(
			expenseType => expenseType.id === toBeEditedId
		);
		const { id, name, need } = res[0];

		this.setState({
			id,
			newName: name,
			newNeed: need,
			displayUpdate: true,
			displayAdd: false
		});
	};

	handleDelete = toBeDeletedId => {
		this.props.deleteExpenseType(toBeDeletedId);
	};

	render() {
		const { displayUpdate, displayAdd } = this.state;

		const updateStyle = displayUpdate
			? { margin: "15px" }
			: { margin: "15px", display: "none" };

		const addStyle = displayAdd
			? { margin: "15px" }
			: { margin: "15px", display: "none" };

		return (
			<div className="container">
				<div className="row ">
					<div className="col-4 flexBorder">
						<Input
							labelFor="expenseTypeName"
							labelName="Expense Type"
							inputId="expenseType"
							value={this.state.newName}
							type="text"
							onChange={this.handleNameChange}
							placeholder="Expense Type"
							autoComplete="off"
						/>

						<Select
							labelFor="expenseTypeNeed"
							labelName="Need"
							selectId="expenseTypeNeed"
							value={this.state.newNeed}
							onChange={this.handleNeedChange}
							options={this.state.options}
						/>

						<div className="buttonContainer">
							<button
								className="btn btn-primary btn-md"
								style={addStyle}
								onClick={this.handleAdd}
							>
								Add
							</button>

							<button
								className="btn btn-primary btn-md maskDisplay"
								style={updateStyle}
								onClick={this.handleUpdate}
							>
								Update
							</button>
						</div>
					</div>

					<div className="col">
						<Table data={this.state.data} columns={this.state.columns} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		expenseTypes: state.expenseType.expenseTypes
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getExpenseType: dispatch(getExpenseType()),
		addExpenseType: expenseType => dispatch(addExpenseType(expenseType)),
		updateExpenseType: expenseType => dispatch(updateExpenseType(expenseType)),
		deleteExpenseType: expenseType => dispatch(deleteExpenseType(expenseType))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ExpenseType);
