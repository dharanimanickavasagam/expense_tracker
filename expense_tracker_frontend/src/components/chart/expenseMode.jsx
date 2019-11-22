import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  }
});

class ExpenseMode extends Component {
  state = {};
  render() {
    const { classes, currencyFormat } = this.props;

    return (
      <>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Expense Mode
        </Typography>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Fixed : {currencyFormat} {this.props.totalFixedExpense}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Variable : {currencyFormat} {this.props.totalVariableExpense}
          </Paper>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => {
  const stateExpense = state.expense.expenses;

  let totalVariableExpense, totalFixedExpense;

  if (stateExpense.length > 0) {
    const variableExpense = stateExpense.filter(
      expense => expense.mode == "Variable"
    );
    const fixedExpense = stateExpense.filter(
      expense => expense.mode == "Fixed"
    );

    totalVariableExpense = variableExpense.reduce(
      (acc, vex) => acc + vex.amount,
      0
    );
    totalFixedExpense = fixedExpense.reduce((acc, fex) => acc + fex.amount, 0);
  }
  return {
    totalVariableExpense: totalVariableExpense,
    totalFixedExpense: totalFixedExpense
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ExpenseMode));
