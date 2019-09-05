import React, { Component } from 'react';
import Input from "./common/input";
import Select from "./common/select";
import Joi from "@hapi/joi"; 

class ExpenseForm extends Component {
    
    state = { 
        name : "", 
        expenseTypeOptions : ["Water","Gas","Mobile","Misc","Rent","Food"],
        type: "",
        amount : 0,
        errors : "" 
    }

    schema = { 
        name : Joi.string().min(5).required(), 
        type : Joi.string().required(),
        amount : Joi.number().required().min(1).max(1000)
    }

    handleExpenseName = (event) => { 
        this.setState({name : event.target.value}, () => { 
            console.log(this.state.name);
        }); 
    }

    handleExpenseType = (event) => { 
        this.setState({type : event.target.value}, () => { 
            console.log(this.state.type);
        }); 
    }
    
    handleExpenseAmount = (event) => { 
        this.setState({amount : event.target.value}, () => { 
            console.log(this.state.amount);
        }); 
    }

    validate = () => { 
        const options ={abortEarly : false}; 
        const {error} = Joi.validate({name : this.state.name,type : this.state.type, amount : this.state.amount},
                        this.schema,options); 

        //no error, set disabled to false by returning null
        if(!error) return null; 
        
        //errors
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        } 
        return errors;

    }

    handleSubmit = (event) => { 
        event.preventDefault(); 
        const errors = this.validate();
        
        this.setState({errors : errors || {} });
        if (errors) return;      
    }

    render() { 
        const {errors} = this.state; 
        console.log(errors);
    
     return ( 
        <form onSubmit={this.handleSubmit}>
            <Input labelFor="expenseName" labelName="Expense Name" inputId="expenseName" type="text"
               onChange={this.handleExpenseName} error={errors} placeholder="Expense description"/>

            <Select labelFor="expenseType" labelName="Expense Type" selectId="expenseType" 
                onChange={this.handleExpenseType} options={this.state.expenseTypeOptions}/>

            <Input labelFor="expenseAmount" labelName="Amount" inputId="expenseAmount" type="number"
                max="1000" min="1" step="0.5" onChange={this.handleExpenseAmount} placeholder="Expense Amount" />

            <button type="submit" disabled={this.validate()}  style={{marginTop : "15px", marginLeft: "15px"}} 
                className="btn btn-primary">Submit</button>
        </form> 
        );
    }
}
 
export default ExpenseForm;
