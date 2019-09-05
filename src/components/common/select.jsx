import React, { Component } from 'react';

const Select = ({labelFor,labelName,selectId,options,...rest}) => {
    return (  
        <div className="col-auto my-1">
            <label className="mr-sm-2" htmlFor={labelFor}>{labelName}</label>
            <select className="custom-select" id={selectId} {...rest}>
                <option value=""> Select </option>
                {options.map(option => 
                    <option key={option}> {option} </option>
                )}
            </select>
        </div>
    );
}
 
export default Select;