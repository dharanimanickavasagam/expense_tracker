import {
  GET_EXPENSE_TYPE,
  ADD_EXPENSE_TYPE,
  UPDATE_EXPENSE_TYPE,
  DELETE_EXPENSE_TYPE
} from "../constants/constants";

import {
  getExpenseTypeService,
  addExpenseTypeService,
  deleteExpenseTypeService,
  updateExpenseTypeService
} from "../services/expenseTypeService";


export const getExpenseType = () => {
  return function (dispatch) {
    return getExpenseTypeService()
      .then(response => response.data)
      .then(data => {
        dispatch({
          type: GET_EXPENSE_TYPE,
          payload: data
        });
      });
  };
};

export const addExpenseType = payload => {
  return function (dispatch) {
    return addExpenseTypeService(payload)
      .then(
        dispatch({
          type: ADD_EXPENSE_TYPE,
          payload: payload
        })
      );
  };
};

export const updateExpenseType = payload => {
  return function (dispatch) {
    return updateExpenseTypeService(payload)
      .then(
        dispatch({
          type: UPDATE_EXPENSE_TYPE,
          payload: payload
        })
      );
  }
};

export const deleteExpenseType = payload => {
  return function (dispatch) {
    return deleteExpenseTypeService(payload)
      .then(
        dispatch({
          type: DELETE_EXPENSE_TYPE,
          payload: payload
        })
      );
  };
};