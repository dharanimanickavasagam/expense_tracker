import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getBudgetFunds = async () => {
    const {
        data
    } = await http.get(`${config.apiEndPoint}` + "/budget");
    return data;
}

export const updateBudgetFunds = async (budget) => {
    const id = budget._id;
    console.log(id)
    const {
        data
    } = await http.put(`${config.apiEndPoint}` + "/budget/" + `${id}`, budget);
    return data;
}

export const addBudgetFunds = async (budget) => {
    const {
        data
    } = await http.post(`${config.apiEndPoint}` + "/budget", budget);
    return data;
}