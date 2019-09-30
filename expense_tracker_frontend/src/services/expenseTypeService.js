import http from "../httpAxiosModule/httpAxiosModule";
import api from "../config.json"

export const getExpenseTypeService = () => {
    return http.get(api.apiEndPoint + "/expenseType");
}

export const addExpenseTypeService = (expenseType) => {
    return http.post(api.apiEndPoint + "/expenseType", expenseType);
}

export const deleteExpenseTypeService = (expenseTypeID) => {
    return http.delete(api.apiEndPoint + "/expenseType/" +
        `${expenseTypeID}`);
}

export const updateExpenseTypeService = (expenseType) => {
    const id = expenseType.id;
    return http.put(api.apiEndPoint + "/expenseType/" +
        `${id}`, expenseType);
}