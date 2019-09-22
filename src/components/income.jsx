import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AddIncome from "./addIncome";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
	getIncome,
	addIncome,
	deleteIncome,
	updateIncome
} from "../actions/income";
import moment from "moment";

const styles = theme => ({
	root: {
		display: "flex",
		position: "relative",
		overflowX: "hidden",
		height: "90vh"
	},
	paper: {
		boxShadow: "none !important",
		backgroundColor: "none !important",
		borderRadius: "none !important"
	},
	table: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		margin: "auto"
	}
});

class Income extends Component {
	state = {
		columns: [
			{ title: "Date", field: "date", type: "date" },
			{ title: "Payer", field: "payer" },
			{ title: "Income", field: "income", type: "numeric" },
			{ title: "Notes", field: "notes" }
		],
		data: this.props.income
	};

	componentDidMount() {
		getIncome();
	}

	render() {
		const { classes } = this.props;
		console.log(this.props);
		return (
			<div>
				<Grid container className={classes.root}>
					<Grid item xs={4} className={classes.income}>
						<Paper className={classes.paper}>
							<AddIncome />
						</Paper>
					</Grid>

					<Grid item xs={7} className={classes.table}>
						<Paper className={classes.paper}>
							<MaterialTable
								title="Manage Income"
								columns={this.state.columns}
								data={this.state.data}
								editable={{
									onRowAdd: newData =>
										new Promise(resolve => {
											setTimeout(() => {
												resolve();
												const data = [...this.state.data];
												newData.date = moment(newData.date).format(
													"MM/DD/YYYY"
												);
												data.push(newData);
												this.setState({ data });
												this.props.addIncome(newData);
											}, 600);
										}),
									onRowUpdate: (newData, oldData) =>
										new Promise(resolve => {
											setTimeout(() => {
												resolve();
												const data = [...this.state.data];
												data[data.indexOf(oldData)] = newData;
												this.setState({ data });
												this.props.updateIncome(newData);
											}, 600);
										}),
									onRowDelete: oldData =>
										new Promise(resolve => {
											setTimeout(() => {
												resolve();
												const data = [...this.state.data];
												data.splice(data.indexOf(oldData), 1);
												this.setState({ data });
												console.log(oldData.id);
												this.props.deleteIncome(oldData.id);
											}, 600);
										})
								}}
							/>
						</Paper>
					</Grid>
				</Grid>
			</div>
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
)(withStyles(styles)(Income));
