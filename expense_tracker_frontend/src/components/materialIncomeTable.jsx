import React, { Component } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
	getIncome,
	addIncome,
	deleteIncome,
	updateIncome
} from "../actions/income";
import _ from "lodash"


class MaterialIncomeTable extends Component {
	state = {
		columns: [
			{ title: "Date", field: "date", type: "date" },
			{ title: "Payer", field: "payer" },
			{ title: "Income", field: "income", type: "numeric" },
			{ title: "Notes", field: "notes" }
		],
		data: []
	};

	getTableData = () => {
		const data = this.props.income;
		this.setState({ data });
	};

	componentDidMount = () => {
		this.getTableData();
	};

	componentDidUpdate = prevProps => {
		if (this.props.income !== prevProps.income) {
			this.getTableData();
			getIncome();
		}
	};

	render() {
		return (
			<MaterialTable
				title="Income"
				columns={this.state.columns}
				data={this.state.data}
				editable={{
					onRowUpdate: (newData, oldData) =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve();
								const data = [...this.state.data];
								data[data.indexOf(oldData)] = newData;
								this.setState({ data });
								const updateData = _.omit(newData, "tableData");
								this.props.updateIncome(updateData);
							}, 600);
						}),

					onRowDelete: oldData =>
					new Promise(resolve => {
						setTimeout(() => {
							resolve();
							const data = [...this.state.data];
							data.splice(data.indexOf(oldData), 1);
							this.setState({data})
							this.props.deleteIncome(oldData._id);
						}, 600);
						})
				}}
			/>
		);
	}
}
const mapStateToProps = state => {
	return {
		income: state.income.income
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getIncome: dispatch(getIncome()),
		addIncome: income => dispatch(addIncome(income)),
		deleteIncome: incomeID => dispatch(deleteIncome(incomeID)),
		updateIncome: income => dispatch(updateIncome(income))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MaterialIncomeTable);
