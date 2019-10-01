import React, { Component } from 'react';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';

class Expense extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Expense 
            </Typography>
   
            <Typography component="center" variant="h4">
             $ {this.props.totalExpense}
            </Typography>
            </>
         );
    }
}
const mapStateToProps = (state) => { 
    const stateExpense = state.expense.expenses; 
    let total;
    
    if (stateExpense.length > 0){
        const expense = stateExpense.map(expense => expense.amount)
        total = expense.reduce((acc,inc) => acc + inc);
    }
    return { 
        totalExpense : total
    }
}
export default connect(mapStateToProps)(Expense);