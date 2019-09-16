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

      if (_.isEqual(action.payload.sort(), state.expenseTypes.sort())) {
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
      //gets the latest id
      const id = state.expenseTypes.slice(-1)[0].id + 1;

      return Object.assign({}, state, {
        expenseTypes: state.expenseTypes.concat({

          ...action.payload,
          id
        })
      });
    }

    case UPDATE_EXPENSE_TYPE: {
      console.log("reducer", action.payload);
      const {
        name,
        need,
        id
      } = action.payload;
      console.log("id in reducer", id);

      return {
        ...state,
        expenseTypes: state.expenseTypes.map((eT) =>
          eT.id === id ? {
            ...eT,
            name,
            need
          } : eT
        )
      };
    }

    case DELETE_EXPENSE_TYPE: {
      const toBeDeletedID = action.payload;

      return {
        ...state,
        expenseTypes: state.expenseTypes.filter(
          expenseType => expenseType.id !== toBeDeletedID
        )
      };
    }

    default:
      return state;
  }
};

export default expenseType;