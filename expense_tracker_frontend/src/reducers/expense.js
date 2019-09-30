import {
    ADD_EXPENSE,
    GET_EXPENSE,
    DELETE_EXPENSE,
    UPDATE_EXPENSE
} from "../constants/constants";
import _ from "lodash";

const initialState = {
    expenses: []
}

const expense = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPENSE:

            if (_.isEqual(action.payload, state.expenses)){
                return Object.assign({}, state, {
                    expenses: state.expenses
                });
            } else {
                return Object.assign({}, state, {
                    expenses: state.expenses.concat(action.payload)
                });
            }
            case ADD_EXPENSE: {
                return Object.assign({}, state, {
                    expenses: state.expenses.concat({
                        ...action.payload
                    })
                });
            }

            case UPDATE_EXPENSE:
                const {
                    date, description, type, mode, amount, notes, _id
                } = action.payload;
                return {
                    ...state,
                    expenses: state.expenses.map((expense) =>
                        expense._id === _id ? {
                            ...expense,
                            _id,
                            date,
                            description,
                            type,
                            mode,
                            amount,
                            notes
                        } : expense
                    )
                };

            case DELETE_EXPENSE:
                const toBeDeletedID = action.payload._id;
                return {
                    ...state,
                    expenses: state.expenses.filter(
                        expenseType => expenseType._id !== toBeDeletedID
                    )
                };

            default:
                return state;
    }

}

export default expense;