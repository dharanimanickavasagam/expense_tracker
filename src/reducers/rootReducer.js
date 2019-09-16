import {
  combineReducers
} from "redux";
import expenseType from "./expenseType";
import expense from "./expense";


const rootReducer = combineReducers({
  expenseType: expenseType,
  expense: expense
});


export default rootReducer;