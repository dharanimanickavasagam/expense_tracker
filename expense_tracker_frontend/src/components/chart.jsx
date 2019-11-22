import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChartModes from "./chartModes";
import Income from "./chart/income";
import Savings from "./chart/savings";
import Expense from "./chart/expense";
import ExpenseMode from "./chart/expenseMode";
import { connect } from "react-redux";
import { getSelectedCurrencyService } from "../services/household";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 200
  }
}));

const Chart = () => {
  const classes = useStyles();
  const [currencyFormat, setCurrencyFormat] = useState("");

  useEffect(() => {
    async function getCurrency() {
      const res = await getSelectedCurrencyService();
      setCurrencyFormat(res);
    }
    getCurrency();
  }, [currencyFormat]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <ChartModes />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Income currencyFormat={currencyFormat} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Expense currencyFormat={currencyFormat} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Savings currencyFormat={currencyFormat} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <ExpenseMode currencyFormat={currencyFormat} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currencyFormat: "W"
  };
};

export default connect(mapStateToProps)(Chart);
