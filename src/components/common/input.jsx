import React from 'react';

const Input = ({labelFor,labelName,inputId,type,onChange, ...rest}) => {
   //const errored = error !== " " ? error : false; 
   //{errored && <div className="alert alert-danger">{errored}</div>}
   //console.log(errored)
    
   return (
        <div className="col-auto">
            <label htmlFor={labelFor}>{labelName}</label>
            <input type={type} className="form-control" 
            id={inputId} {...rest}
            onChange={onChange}
           />
          
        </div>
       
      );
}
 
export default Input;