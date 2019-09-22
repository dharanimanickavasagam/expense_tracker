import {
    ADD_INCOME,
    DELETE_INCOME,
    GET_INCOME,
    UPDATE_INCOME
} from "../constants/constants";
import _ from "lodash";

const initialState = {
    income: []
}

const income = (state = initialState, action) => {
    switch (action.type) {

        case GET_INCOME:
            if (_.isEqual(action.payload.sort(), state.income.sort())) {
                return Object.assign({}, state, {
                    income: state.income
                });
            } else {
                return Object.assign({}, state, {
                    income: state.income.concat(action.payload)
                });
            }

            case ADD_INCOME: {
                console.log(action.payload, " in reducer");

                let id;
                if (state.income.length === 0) {
                    id = 1;
                } else {
                    id = state.income.slice(-1)[0].id + 1;
                }
                return Object.assign({}, state, {
                    income: state.income.concat({
                        ...action.payload,
                        id
                    })
                })
            }

            case DELETE_INCOME:
                const toBeDeletedID = action.payload;
                return {
                    ...state,
                    income: state.income.filter(inc => inc.id !== toBeDeletedID)
                };

            case UPDATE_INCOME:
                const {
                    date, payer, income, notes, id
                } = action.payload;
                return {
                    ...state,
                    income: state.income.map((inc) =>
                        inc.id === id ? {
                            ...income,
                            id,
                            date,
                            payer,
                            income,
                            notes
                        } : income
                    )
                };

            default:
                return state;
    }
}

export default income;