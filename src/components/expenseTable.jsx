import React, { Component } from "react";
import { getExpense } from "../actions/expense";
import { connect } from "react-redux";
import Table from "../components/common/table";

class ExpenseTable extends Component {
	state = {
		columns: ["ID", "Date", "Description", "Type", "Mode", "Amount", "Notes"]
	};

	componentDidMount() {
		getExpense();
	}

	render() {
		return <Table data={this.props.expenses} columns={this.state.columns} />;
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
