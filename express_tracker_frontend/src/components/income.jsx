import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AddIncome from "./addIncome";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MaterialIncomeTable from "./materialIncomeTable";

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
	render() {
		const { classes } = this.props;

		return (
			<Grid container className={classes.root}>
				<Grid item xs={4} className={classes.income}>
					<Paper className={classes.paper}>
						<AddIncome />
					</Paper>
				</Grid>

				<Grid item xs={7} className={classes.table}>
					<Paper className={classes.paper}>
						<MaterialIncomeTable />
					</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Income);
