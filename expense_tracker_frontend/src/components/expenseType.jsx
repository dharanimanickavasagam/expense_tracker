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
		_id: "",
		name: "",
		need: "",
		options: ["Primary", "Secondary", "Misc"],
		columns: ["", "ID", "Type", "Need", ""],
		data: [],
		errors : {},	
		displayUpdate: false,
		displayAdd: true
	};

	schema = {
		name: Joi.string().required(),
		need: Joi.string()
			.min(3)
			.required()
	};


	validateFormDetails = (event) => { 
		
		const options = {abortEarly : false};
		const {error} = Joi.validate({ 
		   name : this.state.name,
		   need : this.state.need, 
		}, this.schema,options);
	
		if(!error) return "valid";
		  
		const errors = { ...this.state.errors };
	
		error.details.map(errorDetails => {
			const errorState = errorDetails.message.match(/"(.*?)"/);
			errors[errorState[1]] = errorDetails.message;
			this.setState({ errors });
			return errorDetails.message;
		});
	}

	getTableData = () => {
		const data = this.props.expenseTypes.map((eT, Id) => {
			return {
				editComp: (
					<Edit name={`edit${eT._id}`} onClick={() => this.handleEdit(eT._id)} />
				),
				...eT,
				trashComp: (
					<Delete
						name={`delete${eT._id}`}
						onClick={() => this.handleDelete(eT._id)}
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

	handleFocus = () => {
		this.setState({ errors: {} });
	};

	handleNameChange = event => {
		const name = event.target.value;
		this.setState({ name });
	};

	handleNeedChange = event => {
		const need = event.target.value;
		this.setState({ need });
	};

	handleAdd = () => {
		const res = this.validateFormDetails();
		if(res === "valid"){
			this.props.addExpenseType({
			name: _.startCase(this.state.name),
			need: this.state.need
		});
		this.setState({ name: "", need: "", _id:"" });}
	};

	handleUpdate = () => {
		const res = this.validateFormDetails();
		if(res === "valid"){
			this.props.updateExpenseType({
			name: _.startCase(this.state.name),
			need: this.state.need,
			_id: this.state._id
		})}

		this.setState({
			name: "",
			need: "",
			_id: "",
			displayUpdate: false,
			displayAdd: true
		});
	};

	handleEdit = toBeEditedId => {
		
		const expenseTypes = [...this.props.expenseTypes];
		const res = expenseTypes.filter(
			expenseType => expenseType._id === toBeEditedId
		);
		const { _id, name, need } = res[0];

		this.setState({
			_id,
			name: name,
			need: need,
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
							value={this.state.name}
							type="text"
							onChange={this.handleNameChange}
							placeholder="Expense Type"
							autoComplete="off"
							onFocus={this.handleFocus}
						/>
						 <div style={{color : "red"}}> 
            					{this.state.errors.name &&
								_.values(this.state.errors.name)}
            			</div>

						<Select
							labelFor="expenseTypeNeed"
							labelName="Need"
							selectId="expenseTypeNeed"
							value={this.state.need}
							onChange={this.handleNeedChange}
							options={this.state.options}
							onFocus={this.handleFocus}
						/>
						<div style={{color : "red"}}> 
            					{this.state.errors.need &&
								_.values(this.state.errors.need)}
            			</div>

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
