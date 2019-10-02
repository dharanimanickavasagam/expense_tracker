import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Joi from "joi-browser"
import _ from "lodash";

const Signup = () => {

  

  const validateName = () => { 
    const {error} = Joi.validate( name , Joi.string().required()); 
    console.log(error)

    if(!error)
        return 
    
    error.details.map(errorDetails => {
        
        setNameError( errorDetails.message );
        console.log(nameError)
        return errorDetails.message;
    })
  }

    return ( 
   hi
       );
}
 
export default Signup;