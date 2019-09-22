import {
    ADD_INCOME,
    DELETE_INCOME,
    GET_INCOME,
    UPDATE_INCOME
} from "../constants/constants";
import {
    addIncomeService,
    deleteIncomeService,
    getIncomeService,
    updateIncomeService
} from "../services/income";

export const getIncome = () => {
    return function (dispatch) {
        return getIncomeService()
            .then(response => response.data)
            .then(data => {
                dispatch({
                    type: GET_INCOME,
                    payload: data
                });
            });
    }
}
export const addIncome = (payload) => {
    return function (dispatch) {
        return addIncomeService(payload)
            .then(dispatch({
                type: ADD_INCOME,
                payload
            }))
    }
}

export const updateIncome = (payload) => {
    return function (dispatch) {
        return updateIncomeService(payload)
            .then(dispatch({
                type: UPDATE_INCOME,
                payload
            }))
    }
}

export const deleteIncome = (payload) => {
    return function (dispatch) {
        return deleteIncomeService(payload)
            .then(dispatch({
                type: DELETE_INCOME,
                payload
            }))
    }
}