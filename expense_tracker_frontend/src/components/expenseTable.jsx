import React, { Component } from "react";
import { getExpense } from "../actions/expense";
import { connect } from "react-redux";
import Table from "../components/common/table";
import _ from "lodash";

class ExpenseTable extends Component {
	state = {
		columns: ["ID", "Date", "Description", "Type", "Mode", "Amount", "Notes"]
	};

	componentDidMount() {
		getExpense();
	}

	render() {
		const filteredExpenses = this.props.expenses.map(expense => {
			const filter = _.omit(expense, ["tableData"]);
			return filter;
		});
		return <Table data={filteredExpenses} columns={this.state.columns} />;
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
)(ExpenseTable);
