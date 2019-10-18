import React, { Component } from "react";
import { connect } from "react-redux";
import { getExpenseType } from "../../actions/expenseType";
import { getExpense } from "../../actions/expense";
import MaterialTable from "material-table";
import {
  getBudgetFunds,
  updateBudgetFunds
} from "../../services/budgetFundService";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  root: {
    margin: "0 10rem ",
    padding: "3rem 0",
    display: "flex",
    justifyContent: "center"
  }
});
class Budget extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    columns: [
      { title: "Expense Type", field: "expenseType", editable: "never" },
      { title: "Expense Type Id", field: "expenseTypeid", editable: "never" },
      { title: "Budget Funds", field: "funds", type: "numeric" },
      {
        title: "Progress",
        field: "progress"
      },
      {
        title: "Allocated %",
        field: "value",
        editable: "never",
        type: "numeric"
      }
    ],
    data: []
  };

  componentDidMount() {
    this.getTableData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;
    const eliminatedData = data.map(datum =>
      _.omit(datum, ["tableData", "progress", "value"])
    );
    const eliminatedprevState = prevState.data.map(state =>
      _.omit(state, ["tableData", "progress", "value"])
    );

    if (!_.isEqual(eliminatedprevState, eliminatedData)) {
      console.log("updating");
      getExpenseType();
      this.getTableData();
    }
  }

  getTableData = async () => {
    const result = await getBudgetFunds();
    this.getProgressBarData(result);
  };

  displayProgressBar = barValue => {
    const progressBarColor = barValue < 100 ? "primary" : "secondary";
    const progressBarValue = barValue < 100 ? barValue : 100;
    return (
      <LinearProgress
        variant="determinate"
        color={progressBarColor}
        value={progressBarValue}
      />
    );
  };

  getProgressBarData = result => {
    let data = [];
    const progressCount = {};
    this.props.expense.forEach(expense => {
      if (!progressCount[expense.type]) {
        progressCount[expense.type] = 0;
      }
      progressCount[expense.type] += expense.amount;
    });

    for (const prop in progressCount) {
      result.map(res => {
        if (prop === res.expenseType.name) {
          const obj = {
            _id: res._id,
            expenseTypeid: res.expenseType._id,
            expenseType: res.expenseType.name,
            funds: res.funds,
            progress: this.displayProgressBar(
              (progressCount[prop] / res.funds) * 100
            ),
            value: Math.ceil((progressCount[prop] / res.funds) * 100) + "%"
          };
          data.push(obj);
        }
      });
    }
    this.setState({ data });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <MaterialTable
          title="Budget Funds"
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  {
                    const data = this.state.data;
                    data.push(newData);
                    this.setState({ data }, () => resolve());
                  }
                  resolve();
                }, 1000);
              }),

            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve();
                  const data = [...this.state.data];
                  const res = _.indexOf(data, oldData);
                  data[res] = _.omit(newData, "progress");
                  this.setState({ data });
                  const updateData = _.omit(newData, [
                    "expenseType",
                    "tableData",
                    "progress",
                    "value"
                  ]);
                  updateBudgetFunds(updateData);
                }, 600);
              })
          }}
          options={{
            headerStyle: {
              backgroundColor: "#3f51b5",
              color: "#FFF"
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const expenseTypesState = state.expenseType.expenseTypes;
  const expenseTypes = expenseTypesState.map(expenseType => expenseType.name);

  return {
    expenseTypes: expenseTypes,
    expense: state.expense.expenses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExpenseType: dispatch(getExpenseType()),
    getExpense: dispatch(getExpense())
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Budget)
);
