import React from "react";

const TextArea = ({ labelFor, labelName, inputId, onChange, ...rest }) => {
  return (
    <div className="col-auto">
      <label htmlFor={labelFor}>{labelName}</label>
      <textarea
        className="form-control"
        id={inputId}
        {...rest}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
