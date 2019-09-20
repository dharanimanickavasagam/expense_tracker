import React, { Component } from "react";
import { VictoryPie } from "victory";
import { connect } from "react-redux";
import { getExpense } from "../actions/expense";
import _ from "lodash";

class Chart extends Component {
	sampleData = [];

	componentDidUpdate() {
		this.displayChartByExpenseType();
		getExpense();
	}

	displayChartByExpenseType = () => {
		const sampleData = [];
		const expenses = this.props.expenses;

		const expenseTypes = expenses.map(expense => expense.type);
		const chartData = _.countBy(expenseTypes);
		console.log(chartData);

		for (let i in chartData) {
			sampleData.push({ x: i, y: chartData[i] });
		}
		return sampleData;
	};

	render() {
		const sampleData = this.displayChartByExpenseType();
		return (
			<div style={{ textAlign: "center" }}>
				<svg width={600} height={500}>
					<VictoryPie
						data={sampleData}
						standalone={false}
						colorScale={["red", "navy", "gray", "gold", "green"]}
					/>
				</svg>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		expenses: state.expense.expenses
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getExpense: dispatch(getExpense())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chart);
