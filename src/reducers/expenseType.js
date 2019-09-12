import {
  GET_EXPENSE_TYPE,
  ADD_EXPENSE_TYPE,
  UPDATE_EXPENSE_TYPE,
  DELETE_EXPENSE_TYPE
} from "../constants/constants";
//pure function

const initialState = {
  expenseTypes: [
    { id: 1, name: "Clothing", need: "Primary" },
    { id: 2, name: "Grocery", need: "Primary" },
    { id: 3, name: "Food", need: "Primary" },
    { id: 4, name: "Shelter", need: "Primary" },
    { id: 5, name: "Movie", need: "Secondary" }
  ]
};

const expenseType = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSE_TYPE: {
      return Object.assign({}, state, {
        expenseTypes: state.expenseTypes
      });
    }
    case ADD_EXPENSE_TYPE: {
      //gets the latest id

      const id = state.expenseTypes.slice(-1)[0].id + 1;

      return Object.assign({}, state, {
        expenseTypes: state.expenseTypes.concat({ id, ...action.payload })
      });
    }

    case UPDATE_EXPENSE_TYPE: {
      const { name, need, id } = action.payload;
      return {
        ...state,
        expenseTypes: state.expenseTypes.map((eT, i) =>
          i === id - 1 ? { ...eT, name, need } : eT
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
