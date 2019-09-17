import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
	addExpense,
	deleteExpense,
	updateExpense,
	getExpense
} from "../actions/expense";
import { getExpenseType } from "./../actions/expenseType";
import _ from "lodash";
import moment from "moment";

const MaterialExpenseTable = props => {
	const data = props.expenses;
	console.log(data);
	useEffect(() => {
		const filter = data.map(datum => {
			const del = _.omit(datum, ["tableData"]);
			return del;
		});
		setState({ columns, data: filter });
		getExpense();
		getExpenseType();
	}, [data, props.expenses, props.expenseTypes]);

	const columns = [
		{ title: "Date", field: "date", type: "date" },
		{ title: "Description", field: "description" },
		{ title: "Type", field: "type", lookup: [...props.expenseTypes] },
		{
			title: "Mode",
			field: "mode",
			lookup: ["Fixed", "Variable"]
		},
		{ title: "Amount", field: "amount" },
		{ title: "Notes", field: "notes" }
	];

	const [state, setState] = useState({
		columns,
		data
	});

	return (
		<MaterialTable
			style={{ margin: "10px" }}
			title="Expenses"
			columns={state.columns}
			data={state.data}
			editable={{
				onRowAdd: newData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							const data = [...state.data];
							data.push(newData);
							setState({ ...state, data });
							delete newData.tableData;
							newData.date = moment(newData.date).format("MM/DD/YYYY");
							props.addExpense(newData);
						}, 600);
					}),

				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							const data = [...state.data];
							data[data.indexOf(oldData)] = newData;
							setState({ ...state, data });
							delete newData.tableData;
							props.updateExpense(newData);
						}, 600);
					}),

				onRowDelete: oldData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							const data = [...state.data];
							data.splice(data.indexOf(oldData), 1);
							setState({ ...state, data });
							console.log("deleteID", oldData.id);
							props.deleteExpense(oldData.id);
						}, 600);
					})
			}}
		/>
	);
};

const mapStateToProps = state => {
	const expenseTypes = state.expenseType.expenseTypes;
	const filteredExpenseTypeNames = expenseTypes.map(
		expenseType => expenseType.name
	);
	return {
		expenses: state.expense.expenses,
		expenseTypes: filteredExpenseTypeNames
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getExpenseType: dispatch(getExpenseType()),
		getExpense: dispatch(getExpense()),
		addExpense: expense => dispatch(addExpense(expense)),
		deleteExpense: expense => dispatch(deleteExpense(expense)),
		updateExpense: expense => dispatch(updateExpense(expense))
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MaterialExpenseTable);
