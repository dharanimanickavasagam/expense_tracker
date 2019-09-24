import React from "react";

const Delete = ({ onClick, ...res }) => {
  return <i {...res} className="fa fa-trash" onClick={onClick}></i>;
};

export default Delete;
