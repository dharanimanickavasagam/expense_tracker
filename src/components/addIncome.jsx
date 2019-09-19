import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
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
import Joi from "joi-browser";
import _ from "lodash";

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
		display: "flex",
		justifyContent: "left"
	},
	formControl: {
		display: "block"
	},
	checkBox: {
		display: "block"
	},
	buttonGroup: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between !important",
		margin: theme.spacing(2),
		boxShadow: "none !important",
		backgroundColor: "none !important"
	},
	button: {
		display: "flex",
		justifyContent: "space-around",
		margin: theme.spacing(5)
	},
	error: {
		color: "red"
	}
});

class AddIncome extends Component {
	state = {
		date: this.getDate(),
		payer: "",
		income: "",
		standard: false,
		modalToggle: false,
		notes: "",
		errors: {}
	};

	schema = {
		payer: Joi.string()
			.required()
			.min(2),
		income: Joi.number().required()
	};

	validateSchema = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(
			{
				payer: this.state.payer,
				income: this.state.income
			},
			this.schema,
			options
		);

		if (!error) {
			this.setState({ modalToggle: true });
			return;
		}
		const errors = { ...this.state.errors };

		error.details.map(errorDetails => {
			const errorState = errorDetails.message.match(/"(.*?)"/);
			errors[errorState[1]] = errorDetails.message;
			this.setState({ errors });
			return errorDetails.message;
		});
	};

	getDate() {
		const date = Date.now();
		return moment(date).format("MM/DD/YYYY");
	}
	handleFocus = () => {
		this.setState({ errors: {} });
	};

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
		this.validateSchema();
	};

	handleClear = () => {
		this.setState({
			payer: "",
			income: "",
			standard: false,
			notes: "",
			errors: {}
		});
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
								<TypoGraphy variant="h5">Add Income Drawer</TypoGraphy>
								<Paper className={classes.paper}>
									<TypoGraphy>
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

								<FormControl className={classes.formControl}>
									<TextField
										id="standard"
										value={this.state.payer}
										onChange={this.handlePayer}
										onFocus={this.handleFocus}
										label="Payer"
										required
										placeholder="Payer"
										margin="normal"
										InputLabelProps={{
											shrink: true
										}}
									/>
									<FormHelperText className={classes.error}>
										{this.state.errors.payer &&
											_.values(this.state.errors.payer)}
									</FormHelperText>
								</FormControl>

								<FormControl className={classes.formControl}>
									<TextField
										id="standard-number"
										value={this.state.income}
										onChange={this.handleIncome}
										onFocus={this.handleFocus}
										placeholder="$"
										margin="normal"
										required
										label="Income"
										type="number"
										InputLabelProps={{
											shrink: true
										}}
									/>
									<FormHelperText className={classes.error}>
										{this.state.errors.income &&
											Object.values(this.state.errors.income)}
									</FormHelperText>
								</FormControl>

								<FormControlLabel
									className={classes.checkBox}
									control={
										<Checkbox onChange={this.handleStandard} value="checkedF" />
									}
									label="Standard"
								/>

								<FormControl fullWidth>
									<TextareaAutosize
										fullWidth
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
										<Button
											className={classes.button}
											variant="contained"
											onClick={this.handleClick}
										>
											Add Income
										</Button>
										<Button
											className={classes.button}
											color="secondary"
											onClick={this.handleClear}
										>
											Clear
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
