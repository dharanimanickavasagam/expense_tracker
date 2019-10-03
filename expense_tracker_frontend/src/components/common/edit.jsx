import React from "react";

const Edit = ({ onClick, onMouseHover, ...rest }) => {
  return <i {...rest} className="fa fa-edit" onClick={onClick}></i>;
};

export default Edit;
