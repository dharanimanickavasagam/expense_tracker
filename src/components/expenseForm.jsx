import React, { Component } from "react";
import Input from "./common/input";
import Select from "./common/select";
import Joi from "joi-browser";
import { connect } from "react-redux";

class ExpenseForm extends Component {
  state = {
    name: "",
    type: "",
    amount: 0,
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

  handleExpenseName = event => {
    this.setState({ name: event.target.value }, () => {});
  };

  handleExpenseType = event => {
    this.setState({ type: event.target.value }, () => {});
  };

  handleExpenseAmount = event => {
    this.setState({ amount: event.target.value }, () => {});
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

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          labelFor="expenseName"
          labelName="Expense Name"
          inputId="expenseName"
          type="text"
          onChange={this.handleExpenseName}
          error={errors}
          placeholder="Expense description"
        />

        <Select
          labelFor="expenseType"
          labelName="Expense Type"
          selectId="expenseType"
          onChange={this.handleExpenseType}
          options={this.props.expenseTypes}
        />

        <Input
          labelFor="expenseAmount"
          labelName="Amount"
          inputId="expenseAmount"
          type="number"
          max="1000"
          min="1"
          step="0.5"
          onChange={this.handleExpenseAmount}
          placeholder="Expense Amount"
        />

        <button
          type="submit"
          disabled={this.validate()}
          style={{ marginTop: "15px", marginLeft: "15px" }}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
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

export default connect(mapStateToProps)(ExpenseForm);
