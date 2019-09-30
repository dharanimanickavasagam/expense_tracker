import {
  GET_EXPENSE_TYPE,
  ADD_EXPENSE_TYPE,
  UPDATE_EXPENSE_TYPE,
  DELETE_EXPENSE_TYPE
} from "../constants/constants";
import _ from "lodash";


//pure function
const initialState = {
  expenseTypes: []
};

const expenseType = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSE_TYPE: {

      if (_.isEqual(action.payload, state.expenseTypes)) {
        return Object.assign({}, state, {
          expenseTypes: state.expenseTypes
        });
      } else {
        return Object.assign({}, state, {
          expenseTypes: state.expenseTypes.concat(action.payload)
        });
      }
    }

    case ADD_EXPENSE_TYPE: {

      return Object.assign({}, state, {
        expenseTypes: state.expenseTypes.concat({
          ...action.payload,
        })
      });
    }

    case UPDATE_EXPENSE_TYPE: {

      const {
        name,
        need,
        _id
      } = action.payload;
      

      return {
        ...state,
        expenseTypes: state.expenseTypes.map((expenseType) =>
          expenseType._id === _id ? {
              ...expenseType,
              name,
              need,_id
            } : expenseType
        )
      };
    }

    case DELETE_EXPENSE_TYPE: {
      const toBeDeletedID = action.payload._id;
      return {
        ...state,
        expenseTypes: state.expenseTypes.filter(
          expenseType => expenseType._id !== toBeDeletedID
        )
      };
    }

    default:
      return state;
  }
};

export default expenseType;