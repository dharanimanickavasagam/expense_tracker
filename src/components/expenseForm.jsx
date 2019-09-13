import React, { Component, useState } from "react";
import Input from "./common/input";
import Select from "./common/select";
import Joi from "joi-browser";
import { connect } from "react-redux";
import TextArea from "./common/textArea";
import DateSelector from "./common/date";
import moment from "moment";

class ExpenseForm extends Component {
  state = {
    date: "",
    name: "",
    type: "",
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

  handleDate = date => {
    this.setState({ date: moment(date).format("MM/DD/YYYY") });
  };

  handleExpenseName = event => {
    this.setState({ name: event.target.value });
  };

  handleExpenseType = event => {
    this.setState({ type: event.target.value });
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

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className=" flexExpenseForm">
          <DateSelector
            labelFor="expenseDate"
            labelName="Date"
            inputId="expenseDate"
            error={errors}
            onChange={this.handleDate}
          />

          <Input
            labelFor="expenseName"
            labelName="Expense Name"
            inputId="expenseName"
            type="text"
            onChange={this.handleExpenseName}
            error={errors}
            placeholder="Description"
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
            placeholder="$"
          />

          <TextArea
            labelFor="expenseNote"
            labelName="Notes"
            inputId="expenseNote"
            onChange={this.handleExpenseNotes}
            error={errors}
            placeholder="Notes"
          />

          <button
            type="submit"
            disabled={this.validate()}
            style={{ marginTop: "15px", marginLeft: "15px" }}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
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
