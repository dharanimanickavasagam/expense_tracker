import React, { Component } from "react";
import {
	Drawer,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddExpense from "./addExpense";
import AddIncome from "./addIncome";
import DrawerToggle from "./common/drawerToggle";
import MaterialExpenseTable from "./materialExpenseTable";
import styled from "styled-components";

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
});

const StyledDrawer = styled(Drawer)`
	.MuiDrawer-paperAnchorLeft {
		right: 80%;
	}
`;

class Dashboard extends Component {
	state = {
		expenseDrawToggle: false,
		incomeDrawToggle: false
	};

	handleToggle = drawChange => {
		const stateToChange = !this.state[drawChange];
		this.setState({ [drawChange]: stateToChange });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className="flexRow">
				<div className="col-2 menuSection">
					<div className={classes.root}>
						<List component="nav" aria-label="main mailbox folders">
							<ListItem button>
								<ListItemText
									primary="Add Expense"
									name="expenseDrawToggle"
									label="Toggle Drawer"
									onClick={() => this.handleToggle("expenseDrawToggle")}
								/>
							</ListItem>

							<ListItem button>
								<ListItemText
									primary="Add Income"
									label="Toggle Income"
									onClick={() => this.handleToggle("incomeDrawToggle")}
								/>
							</ListItem>
						</List>
						<Divider />

						<DrawerToggle
							className={classes.drawer}
							open={this.state.expenseDrawToggle}
							drawToggleFor="expenseDrawToggle"
							component={"AddExpense"}
							labelName={"Toggle Expense"}
							onClick={this.handleToggle}
						/>

						<Drawer open={this.state.expenseDrawToggle}>
							<AddExpense />
							<Button
								label="Toggle Drawer"
								onClick={() => this.handleToggle("expenseDrawToggle")}
							>
								Close
							</Button>
						</Drawer>

						<StyledDrawer open={this.state.incomeDrawToggle}>
							<AddIncome />
							<Button
								label="Toggle Income"
								onClick={() => this.handleToggle("incomeDrawToggle")}
							>
								Close
							</Button>
						</StyledDrawer>
					</div>
				</div>
				<div className="col-10 tableSection">
					{/* <ExpenseTable /> */}
					<MaterialExpenseTable />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Dashboard);
