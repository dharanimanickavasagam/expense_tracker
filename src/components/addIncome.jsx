import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from "@material-ui/pickers";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DialogComponent from "../components/common/dialogComponent";

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		boxShadow: "none !important",
		backgroundColor: "none !important",
		borderRadius: "none !important"
	},
	grid: {
		spacing: 12
	},
	card: {
		boxShadow: "none !important",
		backgroundColor: "none !important",
		borderRadius: "none !important",
		display: "flex"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	},
	formControl: {
		display: "block"
	},
	checkBox: {
		display: "block",
		marginTop: theme.spacing(5)
	},
	buttonGroup: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: theme.spacing(5),
		boxShadow: "none !important",
		backgroundColor: "none !important"
	}
});

class AddIncome extends Component {
	state = {
		date: this.getDate(),
		payer: "",
		income: "",
		standard: false,
		modalToggle: false,
		notes: ""
	};

	getDate() {
		const date = Date.now();
		return moment(date).format("MM/DD/YYYY");
	}

	handleDate = date => {
		this.setState({ date: moment(date).format("MM/DD/YYYY") });
	};

	handlePayer = event => {
		this.setState({ payer: event.target.value });
	};

	handleIncome = event => {
		this.setState({ income: event.target.value });
	};

	handleNotes = event => {
		this.setState({ notes: event.target.value });
	};

	handleStandard = () => {
		const invertStandard = !this.state.standard;
		this.setState({ standard: invertStandard });
	};
	handleClose = () => {
		this.setState({ modalToggle: false });
		this.handleClear();
	};

	handleClick = () => {
		this.setState({ modalToggle: true });
	};

	handleClear = () => {
		this.setState({ payer: "", income: "", standard: false, notes: "" });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root} style={{ right: "80%" }}>
				<Grid container className={classes.grid}>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<AppBar color="primary" position="static">
								<Toolbar>
									<TypoGraphy>Add Income</TypoGraphy>
								</Toolbar>
							</AppBar>
						</Paper>
					</Grid>

					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardContent>
								<TypoGraphy variant="title">
									<h5> Add Income Drawer</h5>
								</TypoGraphy>
								<Paper className={classes.paper}>
									<TypoGraphy variant="title">
										Add your monthly Income to see what you make and spend
									</TypoGraphy>
								</Paper>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12}>
						<Card className={classes.card}>
							<CardContent>
								<FormControl className={classes.formControl}>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											disableToolbar
											variant="inline"
											format="MM/dd/yyyy"
											margin="normal"
											id="date-picker-inline"
											label="Date"
											value={this.state.date}
											onChange={this.handleDate}
											KeyboardButtonProps={{
												"aria-label": "change date"
											}}
										/>
									</MuiPickersUtilsProvider>
								</FormControl>
								<FormControl>
									<TextField
										id="standard-full-width"
										value={this.state.payer}
										onChange={this.handlePayer}
										label="Payer"
										placeholder="Payer"
										margin="normal"
										InputLabelProps={{
											shrink: true
										}}
									/>
								</FormControl>
								<FormControl>
									<TextField
										id="standard-number"
										value={this.state.income}
										onChange={this.handleIncome}
										min="1"
										placeholder="$"
										required
										label="Amount"
										type="number"
										className={classes.textField}
										InputLabelProps={{
											shrink: true
										}}
										margin="normal"
									/>
								</FormControl>
								<FormControlLabel
									className={classes.checkBox}
									control={
										<Checkbox onChange={this.handleStandard} value="checkedF" />
									}
									label="Standard"
								/>
								<FormControl fullWidth classname={classes.formControl}>
									<TextareaAutosize
										aria-label="minimum height"
										rows={3}
										placeholder="Notes"
										label="Notes"
										value={this.state.notes}
										onChange={this.handleNotes}
									/>
								</FormControl>

								<Grid item xs={12}>
									<ButtonGroup
										variant="contained"
										color="primary"
										size="large"
										aria-label="large contained secondary button group"
										className={classes.buttonGroup}
									>
										<Button variant="contained" onClick={this.handleClick}>
											Add Income
										</Button>
										<Button color="secondary" onClick={this.handleClear}>
											{" "}
											Clear{" "}
										</Button>
									</ButtonGroup>
								</Grid>
							</CardContent>
						</Card>

						<DialogComponent
							modalToggle={this.state.modalToggle}
							handleClose={this.handleClose}
							dialogTitle="Income Added Successfully"
							dialogContentText="Click OK to add new income if any"
							buttonText="OK"
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(AddIncome);
