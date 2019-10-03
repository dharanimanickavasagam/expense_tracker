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
} from "../services/incomeService";

export const getIncome = () => {
    return function (dispatch) {
        return getIncomeService()
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
        .then(data => {
            dispatch({
                type: ADD_INCOME,
                payload : data
            })
        })
    }
}

export const updateIncome = (payload) => {
    return function (dispatch) {
        return updateIncomeService(payload)
            .then(data => {
                dispatch({
                    type: UPDATE_INCOME,
                    payload : data
            })
        })
    }
}

export const deleteIncome = (payload) => {
    return function (dispatch) {
        return deleteIncomeService(payload)
            .then(data => {dispatch({
                type: DELETE_INCOME,
                payload : data
            }) 
        })
    }
}