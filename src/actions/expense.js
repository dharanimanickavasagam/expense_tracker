import {
    GET_EXPENSE,
    ADD_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE
} from "../constants/constants";


export const getExpense = payload => {
    return {
        type: GET_EXPENSE,
        payload
    }
}
export const addExpense = payload => {
    return {
        type: ADD_EXPENSE,
        payload
    }
}

export const updateExpense = payload => {
    return {
        type: UPDATE_EXPENSE,
        payload
    }
}

export const deleteExpense = payload => {
    return {
        type: DELETE_EXPENSE,
        payload
    }
}