import {
    GET_EXPENSE,
    ADD_EXPENSE,
    UPDATE_EXPENSE,
    DELETE_EXPENSE
} from "../constants/constants";
import {
    getExpenseService,
    addExpenseService,
    deleteExpenseService,
    updateExpenseService
} from "../services/expenseService";


export const getExpense = () => {
    return function (dispatch) {
        return getExpenseService()
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
            .then( data => { 
                dispatch({
                    type: ADD_EXPENSE,
                    payload : data
                })
            })
    }
}

export const updateExpense = payload => {
    return function (dispatch) {
        return updateExpenseService(payload)
            .then( data => { 
                dispatch({
                type: UPDATE_EXPENSE,
                payload : data
            })
        })
    }
}

export const deleteExpense = payload => {
    return function (dispatch) {
        return deleteExpenseService(payload)
            .then( data => {
                dispatch({
                    type: DELETE_EXPENSE,
                    payload : data
                })
            })
    }
}