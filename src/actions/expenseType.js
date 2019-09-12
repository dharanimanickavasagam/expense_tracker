import {
  GET_EXPENSE_TYPE,
  ADD_EXPENSE_TYPE,
  UPDATE_EXPENSE_TYPE,
  DELETE_EXPENSE_TYPE
} from "../constants/constants";

export const getExpenseType = payload => {
  return {
    type: GET_EXPENSE_TYPE,
    payload
  };
};

export const addExpenseType = payload => {
  return {
    type: ADD_EXPENSE_TYPE,
    payload
  };
};

export const updateExpenseType = payload => {
  return {
    type: UPDATE_EXPENSE_TYPE,
    payload
  };
};

export const deleteExpenseType = payload => {
  return {
    type: DELETE_EXPENSE_TYPE,
    payload
  };
};
