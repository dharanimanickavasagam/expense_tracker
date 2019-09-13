import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

const DateSelector = ({ labelFor, labelName, inputId, onChange, ...rest }) => {
  const [startDate, setStartDate] = useState(Date.now());

  useEffect(() => {
    onChange(startDate);
  }, [startDate]);

  const handleChangeDate = date => {
    setStartDate(date);
  };

  return (
    <div className="col-auto">
      <div>
        <label htmlFor={labelFor}>{labelName}</label>
      </div>

      <DatePicker
        {...rest}
        id={inputId}
        selected={startDate}
        onChange={date => handleChangeDate(date)}
        // onChange={date => {
        //   onChange(setStartDate(date));
        // }}
      />
    </div>
  );
};

export default DateSelector;
