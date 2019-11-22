import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

class Expense extends Component {
  state = {};
  render() {
    return (
      <>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Expense
        </Typography>

        <Typography component="center" variant="h4" style={{ flex: "1" }}>
          {this.props.currencyFormat} {this.props.totalExpense}
        </Typography>

        <div>
          <Link style={{ color: "#3f51b5" }} to={"/"}>
            View Expense
          </Link>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  const stateExpense = state.expense.expenses;
  let total;

  if (stateExpense.length > 0) {
    const expense = stateExpense.map(expense => expense.amount);
    total = expense.reduce((acc, inc) => acc + inc);
  }
  return {
    totalExpense: total
  };
};
export default connect(mapStateToProps)(Expense);
