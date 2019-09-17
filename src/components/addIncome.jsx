import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";

class AddIncome extends Component {
	state = {};
	render() {
		return (
			<div>
				<AppBar color="primary" position="static">
					<Toolbar>
						<TypoGraphy variant="title" color="inherit">
							Add Expense
						</TypoGraphy>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default AddIncome;
