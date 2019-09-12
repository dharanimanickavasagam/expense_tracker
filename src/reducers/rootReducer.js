import { combineReducers } from "redux"; 
import expenseType from "./expenseType";


const rootReducer = combineReducers({
  expenseType : expenseType
});


export default rootReducer;
