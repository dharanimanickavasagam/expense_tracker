import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getExpenseService = () => {
    return http.get(config.apiEndPoint + "/expenses");
}

export const addExpenseService = (expense) => {
    return http.post(config.apiEndPoint + "/expenses", expense);
}