import { combineReducers } from "redux";
import expenseType from "./expenseType";
import expense from "./expense";
import income from "./income";
import currencyFormat from "./currencyFormat";

const rootReducer = combineReducers({
  expenseType: expenseType,
  expense: expense,
  income: income,
  currencyFormat: currencyFormat
});

export default rootReducer;
