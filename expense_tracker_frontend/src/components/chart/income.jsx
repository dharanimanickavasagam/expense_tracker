import React, { Component } from 'react';
import {connect} from "react-redux";
import Typography from '@material-ui/core/Typography';

class Income extends Component {
    state = {  }
    render() { 
      
        return ( 
            <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Income
            </Typography>
   
            <Typography component="center" variant="h4">
              $ {this.props.totalIncome}
            </Typography>
            </>
         );
    }
}
const mapStateToProps = (state) => { 
    const stateIncome = state.income.income; 
    let total;
    
    if (stateIncome.length > 0){
        const income = stateIncome.map(inc => inc.income)
        total = income.reduce((acc,inc) => acc + inc);
    }
    return { 
        totalIncome : total
    }
}
 
export default connect(mapStateToProps)(Income);