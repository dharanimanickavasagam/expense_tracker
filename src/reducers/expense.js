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

            if (_.isEqual(action.payload.sort(), state.expenses.sort())) {
                return Object.assign({}, state, {
                    expenses: state.expenses
                });
            } else {
                return Object.assign({}, state, {
                    expenses: state.expenses.concat(action.payload)
                });
            }
            case ADD_EXPENSE:
                return Object.assign({}, state, {
                    expenses: state.expenses.concat({
                        ...action.payload
                    })
                });

            case UPDATE_EXPENSE:
                const {
                    date, description, type, mode, amount, notes, id
                } = action.payload;

                return {
                    ...state,
                    expenses: state.expenses.map((expense) =>
                        expense.id === id ? {
                            ...expense,
                            date,
                            description,
                            type,
                            mode,
                            amount,
                            notes,
                            id
                        } : expense
                    )
                };

            case DELETE_EXPENSE:
                const toBeDeletedID = action.payload;
                return {
                    ...state,
                    expenses: state.expenses.filter(
                        expenseType => expenseType.id !== toBeDeletedID
                    )
                };

            default:
                return state;
    }

}

export default expense;