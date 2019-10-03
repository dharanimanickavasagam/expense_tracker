import React, { Component } from 'react';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';

class Savings extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Savings
            </Typography>
   
            <Typography component="center" variant="h4">
            $ {this.props.totalSavings}
            </Typography>
            </>
         );
    }
}

const mapStateToProps = (state) => { 
    const stateIncome = state.income.income;
    const stateExpense = state.expense.expenses; 
    let income,expense,savings;
    
    if (stateExpense.length > 0){
        const expenseAmount = stateExpense.map(expense => expense.amount)
        expense = expenseAmount.reduce((acc,inc) => acc + inc);
    }

    if (stateIncome.length > 0){
        const incomeMoney = stateIncome.map(inc => inc.income)
        income = incomeMoney.reduce((acc,inc) => acc + inc);
    }
  
    return { 
        totalSavings : income - expense
    }
}
 
export default connect(mapStateToProps)(Savings);