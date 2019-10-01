import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChartModes from "./chartModes";
import Income from "./chart/income";
import Savings from "./chart/savings";
import Expense from "./chart/expense";
import ExpenseMode from "./chart/expenseMode"

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
}));

export default function Chart() {
  const classes = useStyles();
  
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
           
            {/* Income */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                  <Income />
              </Paper>
            </Grid>

            {/* Expense */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Expense />
              </Paper>
            </Grid>

            {/* Savings */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                  <Savings />
              </Paper>
            </Grid>

            {/* Expense Mode */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <ExpenseMode />
              </Paper>
            </Grid>

          </Grid>
        </Container>
        
    
    </div>
  );
}