import React, { Component } from "react";
import Input from "./common/input";
import Select from "./common/select";
import Joi from "joi-browser";
import { connect } from "react-redux";
import TextArea from "./common/textArea";
import DateSelector from "./common/date";
import moment from "moment";
import { Card } from "react-bootstrap";
import Radio from "./common/radio";
import { addExpense } from "../actions/expense";
import { getExpenseType } from "../actions/expenseType";

class AddExpense extends Component {
	state = {
		date: "",
		name: "",
		type: "",
		expenseModes: ["Fixed", "Variable"],
		mode: "",
		amount: 0,
		notes: "",
		errors: { name: "", type: "", amount: "" }
	};

	schema = {
		name: Joi.string()
			.min(5)
			.required(),
		type: Joi.string().required(),
		amount: Joi.number()
			.required()
			.min(1)
			.max(1000)
	};

	componentDidMount = () => {
		getExpenseType();
	};

	componentDidUpdate = prevProps => {
		if (this.props.expenseTypes !== prevProps.expenseTypes) {
			getExpenseType();
		}
	};

	handleDate = date => {
		this.setState({ date: moment(date).format("MM/DD/YYYY") });
	};

	handleExpenseName = event => {
		this.setState({ name: event.target.value });
	};

	handleExpenseType = event => {
		this.setState({ type: event.target.value });
	};

	handleExpenseMode = event => {
		this.setState({ mode: event.target.id });
	};

	handleExpenseAmount = event => {
		this.setState({ amount: event.target.value });
	};

	handleExpenseNotes = event => {
		this.setState({ notes: event.target.value });
	};

	validate = () => {
		const options = { abortEarly: false };
		const res = Joi.validate(
			{
				name: this.state.name,
				type: this.state.type,
				amount: this.state.amount
			},
			this.schema,
			options
		);
	};

	handleSubmit = event => {
		event.preventDefault();
		const errors = this.validate();

		this.setState({ errors: errors || {} });
		if (errors) return;
	};

	handleAddExpense = () => {
		this.props.addExpense({
			date: this.state.date,
			description: this.state.name,
			type: this.state.type,
			mode: this.state.mode,
			amount: this.state.amount,
			notes: this.state.notes
		});
		this.handleClearData();
	};

	handleClearData = () => {
		this.setState({
			name: "",
			type: "",
			amount: 0,
			mode: "",
			date: "",
			notes: ""
		});
	};

	render() {
		const { errors } = this.state;

		return (
			// <div className="flexContainer">
			<Card className="flexContainer">
				<Card.Body>
					<Card.Title>Add Expense</Card.Title>
					<Card.Text>
						Track your expenses like a pro! You now have a way to find the
						recurring and variable expenses.
					</Card.Text>

					<Card.Text>
						<DateSelector
							value={this.state.date}
							labelFor="expenseDate"
							labelName="Date"
							inputId="expenseDate"
							error={errors}
							onChange={this.handleDate}
						/>
					</Card.Text>

					<Card.Text>
						<Input
							value={this.state.name}
							labelFor="expenseName"
							labelName="Expense Name"
							inputId="expenseName"
							type="text"
							onChange={this.handleExpenseName}
							error={errors}
							placeholder="Description"
						/>
					</Card.Text>

					<Card.Text>
						<Select
							value={this.state.type}
							labelFor="expenseType"
							labelName="Expense Type"
							selectId="expenseType"
							onChange={this.handleExpenseType}
							options={this.props.expenseTypes}
						/>
					</Card.Text>

					<Card.Text>
						<Radio
							type="radio"
							value={this.state.mode}
							labelFor="expenseMode"
							labelName="Expense Mode"
							inputId="expenseMode"
							onChange={this.handleExpenseMode}
							options={this.state.expenseModes}
						/>
					</Card.Text>

					<Card.Text>
						<Input
							value={this.state.amount}
							labelFor="expenseAmount"
							labelName="Amount"
							inputId="expenseAmount"
							type="number"
							max="1000"
							min="1"
							step="0.5"
							onChange={this.handleExpenseAmount}
							placeholder="$"
						/>
					</Card.Text>

					<Card.Text>
						<TextArea
							value={this.state.notes}
							labelFor="expenseNote"
							labelName="Notes"
							inputId="expenseNote"
							onChange={this.handleExpenseNotes}
							error={errors}
							placeholder="Notes"
						/>
					</Card.Text>

					<button
						type="submit"
						disabled={this.validate()}
						style={{ marginTop: "15px", marginLeft: "15px" }}
						className="btn btn-primary"
						onClick={this.handleAddExpense}
					>
						Add Expense
					</button>

					<button
						style={{ marginTop: "15px", marginLeft: "15px" }}
						className="btn btn-primary"
						onClick={this.handleClearData}
					>
						Clear
					</button>
				</Card.Body>
			</Card>
			// </div>
		);
	}
}

const mapStateToProps = state => {
	const expenseTypes = state.expenseType.expenseTypes;
	const filteredExpenseTypeNames = expenseTypes.map(
		expenseType => expenseType.name
	);

	return {
		expenseTypes: filteredExpenseTypeNames
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getExpenseType: dispatch(getExpenseType()),
		addExpense: expense => dispatch(addExpense(expense))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddExpense);
