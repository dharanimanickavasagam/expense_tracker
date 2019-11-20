import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

class Income extends Component {
  state = {};
  render() {
    return (
      <>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Income
        </Typography>

        <Typography component="center" variant="h4" style={{ flex: "1" }}>
          {this.props.currencyFormat} {this.props.totalIncome}
        </Typography>

        <div>
          <Link style={{ color: "#3f51b5" }} to={"/income"}>
            View Income
          </Link>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  const stateIncome = state.income.income;
  let total;

  if (stateIncome.length > 0) {
    const income = stateIncome.map(inc => inc.income);
    total = income.reduce((acc, inc) => acc + inc);
  }
  return {
    totalIncome: total,
    currencyFormat: state.currencyFormat.currencyFormat
  };
};

export default connect(mapStateToProps)(Income);
