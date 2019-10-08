import React, { Component } from 'react';
import {connect } from "react-redux";
import {getExpenseType} from "../../actions/expenseType";
import MaterialTable from "material-table";



class Budget extends Component {


    constructor(props) {
        super(props);
        this.state = {
          columns: [
            { title: 'Expense Type', field: 'expenseType', editable: 'never' },
            { title: 'Budget Funds', field: 'funds', type: 'numeric' },
            {
              title: 'Progress',
              field: 'progress'
            },
          ],
          data: this.getTableData() 
        }
      }

      componentDidUpdate() {
        getExpenseType();
        this.getTableData(); 
    }

    getTableData =() => { 
        return [
            { expenseType: 'Mehmet', funds: 'Baran',},
            { expenseType: 'Zerya Betül', funds: 'Baran'},
          ]
    }

    render() { 
    
        return ( 
            <MaterialTable
                title="Budget Funds"
                columns={this.state.columns}
                data={this.state.data}
                editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                        const data = this.state.data;
                        const index = data.indexOf(oldData);
                        data[index] = newData;
                        this.setState({ data }, () => resolve());
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


export default (connect(mapStateToProps,mapDispatchToProps)(Budget));