import React, { Component } from "react";
import MaterialTable, {MTableToolbar} from "material-table";
import { connect } from "react-redux";
import {
	getIncome,
	addIncome,
	deleteIncome,
	updateIncome
} from "../actions/income";
import _ from "lodash"
import Button from '@material-ui/core/Button';
import AddIncome from "./addIncome";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from '@material-ui/core/Container';

import LeftAnchorDrawer from "./common/styledDrawer";

class MaterialIncomeTable extends Component {
	state = {
		columns: [
			{ title: "Date", field: "date", type: "date" },
			{ title: "Payer", field: "payer" },
			{ title: "Income", field: "income", type: "numeric" },
			{ title: "Notes", field: "notes" }
		],
		data: [],
		incomeDrawToggle: false
	};



	handleToggle = () => {
		const drawToggle = !this.state.incomeDrawToggle;
		this.setState({ incomeDrawToggle: drawToggle });
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
			<Container maxWidth="lg" style={{display : "flex", alignItems :"center", 
					height : "90vh",justifyContent : "center"}}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Paper >
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

						components={{
							Toolbar: props => (
							<span>
								<MTableToolbar {...props} />
								<Button  color="secondary" onClick={() => this.handleToggle("incomeDrawToggle")}
									style={{padding: '10px 10px',marginRight: 5, diplay : "flex", 
											justifyContent : "flex-end"}}> 
									Add Income </Button>
							</span>
							)
						}}

						options={{
							headerStyle: {
							backgroundColor: '#3f51b5',
							color: '#FFF'
							}
						}}					 
					/>
					</Paper>
				</Grid>
			</Grid>

		<LeftAnchorDrawer  open={this.state.incomeDrawToggle} 
			component={< AddIncome />} label={"Toggle Income"} 
			onClick={() => this.handleToggle("incomeDrawToggle")}
			buttonName={"Close"} />

	</Container>
	)}
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
