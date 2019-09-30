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
               
                return Object.assign({}, state, {
                    income: state.income.concat({
                        ...action.payload
                    })
                })
            }

            case DELETE_INCOME:
                   
                const toBeDeletedID = action.payload._id;
                return {
                    ...state,
                    income: state.income.filter(inc => inc._id !== toBeDeletedID)
                };

            case UPDATE_INCOME:
                const {
                    date, payer, income, notes, _id
                } = action.payload;
                return {
                    ...state,
                    income: state.income.map((inc) =>
                        inc._id === _id ? {
                            ...income,
                            _id,
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