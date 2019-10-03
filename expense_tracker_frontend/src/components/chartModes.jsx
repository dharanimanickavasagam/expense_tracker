import React, { Component } from "react";
import { VictoryPie} from "victory";
import { connect } from "react-redux";
import { getExpense } from "../actions/expense";
import { getIncome } from "../actions/income";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;
const styles = theme => ({
	list: {
		width: 250
	},
	fullList: {
		width: "auto"
	},
	drawer: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: 300,
		flexGrow : 1
	}
 
});

class ChartModes extends Component {
	state = {
		drawerToggle: false,
		type: "income"
	};

	componentDidUpdate() {
		this.displayChartByExpenseType();
		this.displayChartByIncomeVsExpense();
		getExpense();
	}

	handleToggle = () => {
		const stateToChange = !this.state.drawerToggle;
		this.setState({ drawerToggle: stateToChange });
	};

	displayChartByExpenseType = () => {
		const sampleData = [];
		const expenses = this.props.expenses;
		const expenseTypes = expenses.map(expense => expense.type);
		const chartData = _.countBy(expenseTypes);
		for (let i in chartData) {
			sampleData.push({ x: i, y: chartData[i] });
		}
		return sampleData;
	};

	displayChartByIncomeVsExpense = () => {
		const sampleData = [];
		const expenses = this.props.expenses;
		const income = this.props.income;
		if (!expenses) return;
		const expenseAmount = expenses.map(expense => _.parseInt(expense.amount));
		const expenseObj = { Expense: _.sum(expenseAmount) };

		if (!income) return;
		const incomeAmount = income.map(inc => _.parseInt(inc.income));
		const incomeObj = { Income: _.sum(incomeAmount) };
		const sampleDataObj = Object.assign(expenseObj, incomeObj);

		for (let i in sampleDataObj) {
			sampleData.push({ x: i, y: sampleDataObj[i] });
		}

		return sampleData;
	};

	displayChartByExpenseMode = () => {
		const sampleData = [];
		const expenses = this.props.expenses;
		if (!expenses) return;
		const expenseModes = expenses.map(expense => expense.mode);
		const chartData = _.countBy(expenseModes);
		for (let i in chartData) {
			sampleData.push({ x: i, y: chartData[i] });
		}
		return sampleData;
	};

	handleListItem = text => {
		switch (text) {
			case "Income Vs Expense":
				this.handleToggle();
				this.setState({ type: "income" });
				break;

			case "Expense Type":
				this.handleToggle();
				this.setState({ type: "expenseType" });
				break;

			case "Expense Mode":
				this.handleToggle();
				this.setState({ type: "mode" });
				break;

			default:
				return;
		}
	};

	handleChartData = chartState => {
		if (this.state.type === "income")
			return this.displayChartByIncomeVsExpense();
		else if (this.state.type === "expenseType")
			return this.displayChartByExpenseType();
		else return this.displayChartByExpenseMode();
	};

	sideList = classes => (
		<div role="presentation">
			<List>
				{["Income Vs Expense", "Expense Type", "Expense Mode"].map(
					(text, index) => (
						<ListItem button key={index}>
							<ListItemText
								primary={text}
								onClick={() => this.handleListItem(text)}
							/>
						</ListItem>
					)
				)}
			</List>
		</div>
	);

	handleClick = datum => {
		console.log("Clicked", datum);
	};

	render() {
		const {classes} = this.props;
		console.log(classes)

		return (
			<>
				<div>
					<SwipeableDrawer className={classes.drawer}
						open={this.state.drawerToggle}
						onClose={this.handleToggle}
						onOpen={this.handleToggle}
					>
						{this.sideList(classes)}
					</SwipeableDrawer>
				</div>

				<div style={{ textAlign: "center" }}>
					<svg width={500} height={500}>
						<VictoryPie
							data={this.handleChartData(this.state.type)}
							standalone={false}
							colorScale={["red", "navy", "gray", "gold", "green"]}
							animate={{
								duration: 2000
							}}
						/>
					</svg>

					<div>
						<Button color="secondary" onClick={this.handleToggle}>
							Choose Display Modes
						</Button>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = state => {
	return {
		expenses: state.expense.expenses,
		income: state.income.income
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getIncome: dispatch(getIncome()),
		getExpense: dispatch(getExpense())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ChartModes));
