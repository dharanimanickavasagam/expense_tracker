import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getIncomeService = () => {
    return http.get(config.apiEndPoint + "/income");
}

export const addIncomeService = income => {
    return http.post(config.apiEndPoint + "/income", income);
}

export const deleteIncomeService = deleteID => {
    return http.delete(config.apiEndPoint + "/income/" +
        `${deleteID}`);
}

export const updateIncomeService = income => {
    const id = income.id;
    return http.put(config.apiEndPoint + "/income/" +
        `${id}`, income);
}