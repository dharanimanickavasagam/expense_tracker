import React from 'react';
import Joi from "joi-browser";

const Form = () => {
  
    const validate = () => { 
        const options = { abortEarly :false }; 
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


    const handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

}
 
export default Form;