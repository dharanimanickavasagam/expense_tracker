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
                return null

            case DELETE_EXPENSE:
                return null

            default:
                return state;
    }

}

export default expense;