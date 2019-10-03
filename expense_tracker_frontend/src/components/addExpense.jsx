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
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import _ from "lodash";

class AddExpense extends Component {
	state = {
		date: "",
		name: "",
		type: "",
		expenseModes: ["Fixed", "Variable"],
		mode: "",
		amount: 0,
		notes: "",
		errors: {}
	};

	schema = {
		date: Joi.date().required(),
		name: Joi.string()
			.min(5)
			.required(),
		type: Joi.string().required(),
		mode: Joi.string().required(),
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

	handleFocus = () => {
		this.setState({ errors: {} });
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

	validateSchema = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(
			{
				name: this.state.name,
				type: this.state.type,
				mode: this.state.mode,
				amount: this.state.amount,
				date: this.state.date
			},
			this.schema,
			options
		);

		if (!error) {
			return;
		}
		const errors = { ...this.state.errors };

		const validatedResult = error.details.map(errorDetails => {
			const errorState = errorDetails.message.match(/"(.*?)"/);
			errors[errorState[1]] = errorDetails.message;
			this.setState({ errors });
			return errorDetails.message;
		});
		return validatedResult;
	};

	handleSubmit = event => {
		event.preventDefault();
		const errors = this.validateSchema();

		this.setState({ errors: errors || {} });
		if (errors) return;
	};

	handleAddExpense = () => {
		const errors = this.validateSchema();

		if (!errors) {
			this.props.addExpense({
				date: this.state.date,
				name: this.state.name,
				type: this.state.type,
				mode: this.state.mode,
				amount: this.state.amount,
				notes: this.state.notes
			});
			this.handleClearData();
		}
	};

	handleClearData = () => {
		this.setState({
			name: "",
			type: "",
			amount: 0,
			mode: "",
			date: "",
			notes: "",

			errors: {}
		});
	};

	render() {
		const { errors } = this.state;

		return (
			<div style={{ flexGrow: 1 }}>
				<AppBar color="primary" position="static">
					<Toolbar>
						<TypoGraphy variant="title" color="inherit">
							Add Expense
						</TypoGraphy>
					</Toolbar>
				</AppBar>

				<Card className="flexContainer">
					<Card.Body>
						<Card.Title>Add Expense Drawer</Card.Title>
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
								onFocus={this.handleFocus}
								onChange={this.handleDate}
							/>
							<div style={{ color: "red" }}>
								{this.state.errors.date && _.values(this.state.errors.date)}
							</div>
						</Card.Text>

						<Card.Text>
							<Input
								value={this.state.name}
								labelFor="expenseName"
								labelName="Expense Name"
								inputId="expenseName"
								type="text"
								onChange={this.handleExpenseName}
								onFocus={this.handleFocus}
								error={errors}
								placeholder="Description"
							/>
							<div style={{ color: "red" }}>
								{this.state.errors.name && _.values(this.state.errors.name)}
							</div>
						</Card.Text>

						<Card.Text>
							<Select
								value={this.state.type}
								labelFor="expenseType"
								labelName="Expense Type"
								selectId="expenseType"
								onChange={this.handleExpenseType}
								onFocus={this.handleFocus}
								options={this.props.expenseTypes}
							/>
							<div style={{ color: "red" }}>
								{this.state.errors.type && _.values(this.state.errors.type)}
							</div>
						</Card.Text>

						<Card.Text>
							<Radio
								type="radio"
								value={this.state.mode}
								labelFor="expenseMode"
								labelName="Expense Mode"
								inputId="expenseMode"
								onChange={this.handleExpenseMode}
								onFocus={this.handleFocus}
								options={this.state.expenseModes}
							/>
							<div style={{ color: "red" }}>
								{this.state.errors.mode && _.values(this.state.errors.mode)}
							</div>
						</Card.Text>

						<Card.Text>
							<Input
								value={this.state.amount}
								onFocus={this.handleFocus}
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
							<div style={{ color: "red" }}>
								{this.state.errors.amount && _.values(this.state.errors.amount)}
							</div>
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
			</div>
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
