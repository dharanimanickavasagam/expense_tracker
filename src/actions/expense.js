import {
    GET_EXPENSE,
    ADD_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE
} from "../constants/constants";
import {
    getExpenseService,
    addExpenseService,
    deleteExpenseService
} from "../services/expenseService";


export const getExpense = () => {
    return function (dispatch) {
        return getExpenseService()
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_EXPENSE,
                    payload: data
                })
            })
    }
}

export const addExpense = payload => {
    return function (dispatch) {
        return addExpenseService(payload)
            .then(
                dispatch({
                    type: ADD_EXPENSE,
                    payload
                })
            )
    }
}

export const updateExpense = payload => {
    return {
        type: UPDATE_EXPENSE,
        payload
    }
}

export const deleteExpense = payload => {
    return function (dispatch) {
        return deleteExpenseService(payload)
            .then(
                dispatch({
                    type: DELETE_EXPENSE,
                    payload
                })
            )
    }
}