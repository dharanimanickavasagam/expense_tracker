import React, { Component } from 'react';
import Input from "./common/input"; 
import Select from "./common/select"; 
import Table from "./common/table";

class ExpenseType extends Component {
    state = { 
        expenseTypes : [ 
            {name : "Clothing", need : "Primary"},
            {name : "Grocery", need : "Primary"},
            {name : "Food", need : "Primary"}, 
            {name : "Shelter", need : "Primary"}, 
            {name : "Movie", need : "Secondary"}
        ], 
        newName : "",
        newNeed : "",
        options : ["Primary","Secondary","Misc"],
        columns : ["Type", "Need"]
    }

    handleNameChange = (event) => { 
        const newName= event.target.value; 
        this.setState({newName }); 
    }

    handleNeedChange = (event) => { 
        const newNeed= event.target.value; 
        this.setState({newNeed}); 
    }

    handleSubmit = () => { 
        const expenseTypes = [...this.state.expenseTypes];
        expenseTypes.push({name : this.state.newName,need : this.state.newNeed}); 

        this.setState({ expenseTypes, newName:"", newNeed : "" }); 
    }
    
    render() { 
        return ( 
            <>
            <h2> Manage ExpenseType </h2> 
            <div className="container">
                <div className="row ">
                    
                    <div className="col-4 flexBorder">

                        <Input labelFor="expenseTypeName" labelName="Expense Type" inputId="expenseType"
                            value ={this.state.newName} type="text"  onChange={this.handleNameChange} 
                                placeholder="Expense Type" autoComplete="off" />
            
                        <Select labelFor="expenseTypeNeed"  labelName="Need" selectId="expenseTypeNeed"
                            value ={this.state.newNeed} onChange={this.handleNeedChange} 
                                options={this.state.options}/>

                        <button className="btn btn-primary btn-sm" style={{margin:"15px"}} onClick={this.handleSubmit}> Submit </button>
                    </div>
                   
                    <div className="col">
                        <Table data={this.state.expenseTypes} columns={this.state.columns}/>
                    </div>
                </div>
            </div>
            </>
         );
    }
}
 
export default ExpenseType;