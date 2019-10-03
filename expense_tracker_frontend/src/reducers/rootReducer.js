import {
  combineReducers
} from "redux";
import expenseType from "./expenseType";
import expense from "./expense";
import income from "./income";

const rootReducer = combineReducers({
  expenseType: expenseType,
  expense: expense,
  income: income
});


export default rootReducer;