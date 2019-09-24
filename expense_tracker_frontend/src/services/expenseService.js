import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getExpenseService = () => {
    return http.get(config.apiEndPoint + "/expenses");
}

export const addExpenseService = (expense) => {
    return http.post(config.apiEndPoint + "/expenses", expense);
}

export const deleteExpenseService = (expenseID) => {
    console.log("Service", expenseID)
    return http.delete(config.apiEndPoint + "/expenses/" +
        `${expenseID}`);
}

export const updateExpenseService = (expense) => {
    const id = expense.id;
    return http.put(config.apiEndPoint + "/expenses/" +
        `${id}`, expense);
}