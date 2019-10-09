import React, { Component } from 'react';
import {connect } from "react-redux";
import {getExpenseType} from "../../actions/expenseType";
import MaterialTable from "material-table";
import {getBudgetFunds,updateBudgetFunds} from "../../services/budgetFundService";
import _ from "lodash";
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
	root: {
    margin : "0 10rem ",
    padding : "3rem 0",
    display : "flex",
    justifyContent : "center"
  }
});

class Budget extends Component {
  
      constructor(props) {
        super(props);
      }

      state = { 
        columns: [
          { title: 'Expense Type', field: 'expenseType', editable: 'never' },
          { title: 'Expense Type Id', field: 'expenseTypeid', editable: 'never' },
          { title: 'Budget Funds', field: 'funds', type: 'numeric' },
          {
            title: 'Progress',
            field: 'progress'
          },
        ],
        data: []
      }

      componentDidMount () { 
        this.getTableData();
      }


      componentDidUpdate(prevProps, prevState) {
        
        const {data} = this.state;
        console.log("prev",prevState.data , "Now", data)
        // if(prevState.data !== data){
        //     getExpenseType();
        //     this.getTableData();
        // }
      }

      
      getTableData = async() => { 
          const result = await getBudgetFunds() ;
          const data = result.map(res => {
            return { _id : res._id, expenseTypeid : res.expenseType._id, expenseType : res.expenseType.name,
              funds : res.funds}
          })
          this.setState({ data })
      }

    render() { 
     const {classes} = this.props;
     console.log(classes)
        return ( 
          <div className={classes.root} > 

          <MaterialTable
               
                title="Budget Funds"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                  onRowAdd: newData =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      {
                        const data = this.state.data;
                        data.push(newData);
                        this.setState({ data }, () => resolve());
                      }
                      resolve()
                    }, 1000)
                  }),

                  onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                      setTimeout(() => {
                          {
                          const data = this.state.data;
                          const index = data.indexOf(oldData);
                          data[index] = newData;
                          this.setState({ data }, () => resolve());
                          const budget = _.omit(newData, ['expenseType','tableData'])
                          console.log(budget)
                          updateBudgetFunds(budget)
                          }
                          resolve()
                      }, 1000)
                      })
                }}
                options={{
                    headerStyle: {
                      backgroundColor: '#3f51b5',
                      color: '#FFF'
                    }
                }}
          />  
          </div>
        );
    }
}

const mapStateToProps = (state) => { 

    const expenseTypesState = state.expenseType.expenseTypes;
    const expenseTypes = expenseTypesState.map(expenseType => expenseType.name);

    return { 
        expenseTypes : expenseTypes
    }
}

const mapDispatchToProps= (dispatch) => { 
    return { 
        getExpenseType : dispatch(getExpenseType())
    }
}


export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Budget));