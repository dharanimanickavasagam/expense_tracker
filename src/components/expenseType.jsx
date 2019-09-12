import React, { Component } from "react";
import Input from "./common/input";
import Select from "./common/select";
import Table from "./common/table";
import Joi from "joi-browser";
import _ from "lodash";
import { connect } from "react-redux";
import {
  addExpenseType,
  updateExpenseType,
  deleteExpenseType
} from "./../actions/expenseType";
import Edit from "./common/edit";
import Delete from "./common/delete";

class ExpenseType extends Component {
  state = {
    id: "",
    newName: "",
    newNeed: "",
    options: ["Primary", "Secondary", "Misc"],
    columns: ["", "ID", "Type", "Need", ""],
    data: [],
    updateId: ""
  };

  schema = {
    newName: Joi.string().required(),
    newNeed: Joi.string()
      .min(3)
      .required()
  };

  getTableData = () => {
    const data = this.props.expenseTypes.map((eT, Id) => {
      return {
        editComp: (
          <Edit name={`edit${Id}`} onClick={() => this.handleEdit(eT.id)} />
        ),
        ...eT,
        trashComp: (
          <Delete
            name={`delete${Id}`}
            onClick={() => this.handleDelete(eT.id)}
          />
        )
      };
    });
    this.setState({ data });
  };

  componentDidMount = () => {
    this.getTableData();
  };

  componentDidUpdate = prevProps => {
    if (this.props.expenseTypes !== prevProps.expenseTypes) {
      this.getTableData();
    }
  };

  handleNameChange = event => {
    const newName = event.target.value;
    this.setState({ newName });
  };

  handleNeedChange = event => {
    const newNeed = event.target.value;
    this.setState({ newNeed });
  };

  handleAdd = () => {
    this.props.addExpenseType({
      name: _.startCase(this.state.newName),
      need: this.state.newNeed
    });
    this.setState({ newName: "", newNeed: "" });
  };

  handleUpdate = event => {
    this.props.updateExpenseType({
      name: _.startCase(this.state.newName),
      need: this.state.newNeed,
      id: this.state.id
    });
    this.setState({ newName: "", newNeed: "", id: "" });
  };

  handleEdit = toBeEditedId => {
    const expenseTypes = [...this.props.expenseTypes];
    const { id, name, need } = expenseTypes[toBeEditedId - 1];

    this.setState({
      id,
      newName: name,
      newNeed: need
    });
  };

  handleDelete = toBeDeletedId => {
    this.props.deleteExpenseType(toBeDeletedId);
  };

  render() {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-4 flexBorder">
            <Input
              labelFor="expenseTypeName"
              labelName="Expense Type"
              inputId="expenseType"
              value={this.state.newName}
              type="text"
              onChange={this.handleNameChange}
              placeholder="Expense Type"
              autoComplete="off"
            />

            <Select
              labelFor="expenseTypeNeed"
              labelName="Need"
              selectId="expenseTypeNeed"
              value={this.state.newNeed}
              onChange={this.handleNeedChange}
              options={this.state.options}
            />

            <div className="buttonContainer">
              <button
                className="btn btn-primary btn-md"
                style={{ margin: "15px" }}
                onClick={this.handleAdd}
              >
                Add
              </button>

              <button
                className="btn btn-primary btn-md maskDisplay"
                style={{ margin: "15px" }}
                onClick={this.handleUpdate}
              >
                Update
              </button>
            </div>
          </div>

          <div className="col">
            <Table data={this.state.data} columns={this.state.columns} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenseTypes: state.expenseType.expenseTypes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addExpenseType: expenseType => dispatch(addExpenseType(expenseType)),
    updateExpenseType: expenseType => dispatch(updateExpenseType(expenseType)),
    deleteExpenseType: expenseType => dispatch(deleteExpenseType(expenseType))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseType);
