import http from "../httpAxiosModule/httpAxiosModule";
import api from "../config.json"

export const getExpenseTypeService = () => {
    return http.get(api.apiEndPoint + "/expenseTypes");
}

export const addExpenseTypeService = (expenseType) => {
    return http.post(api.apiEndPoint + "/expenseTypes", expenseType);
}

export const deleteExpenseTypeService = (expenseTypeID) => {
    return http.delete(api.apiEndPoint + "/expenseTypes/" +
        `${expenseTypeID}`);
}

export const updateExpenseTypeService = (expenseType) => {
    const id = expenseType.id;
    return http.put(api.apiEndPoint + "/expenseTypes/" +
        `${id}`, expenseType);
}