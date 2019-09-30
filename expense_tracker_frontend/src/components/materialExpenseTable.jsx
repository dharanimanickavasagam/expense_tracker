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

const MaterialExpenseTable = props => {
	const data = props.expenses;
	const lookUpType = Object.assign(
		{},
		...props.expenseTypes.map(key => ({ [key]: key }))
	);


	const columns = [
		{ title: "Date", field: "date", type: "date" },
		{ title: "Description", field: "name" },
		{ title: "Type", field: "type", lookup : lookUpType},
		{
			title: "Mode",
			field: "mode",
			lookup: { Fixed: "Fixed", Variable: "Variable" }
		},
		{ title: "Amount", field: "amount", type: "numeric" },
		{ title: "Notes", field: "notes" }
	];

	useEffect(() => {
		
		const filter = data.map(datum => {
			const del = _.omit(datum, ["tableData"]);
			return del;
		});
		setState({ columns, data: filter });
	}, [data, props.expenses, props.expenseTypes]);

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
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							const data = [...state.data];
							data[data.indexOf(oldData)] = newData;
							setState({ ...state, data });
							const updateData = _.omit(newData, "tableData");
							props.updateExpense(updateData);
						}, 600);
					}),

				onRowDelete: oldData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							const data = [...state.data];
							data.splice(data.indexOf(oldData), 1);
							setState({ ...state, data });
							props.deleteExpense(oldData._id);
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
