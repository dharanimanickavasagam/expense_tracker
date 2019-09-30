import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getIncomeService = async() => {
    const {data} = await http.get(config.apiEndPoint + "/income");
    return data;
}

export const addIncomeService = async(income) => {
    const {data} = await http.post(config.apiEndPoint + "/income", income);
    return data;
}

export const deleteIncomeService = async(deleteID) => {
    const {data} = await http.delete(config.apiEndPoint + "/income/" +
        `${deleteID}`);
    return data;
}

export const updateIncomeService = async(income) => {
    const _id = income._id;
    const {data} = await http.put(config.apiEndPoint + "/income/" +
        `${_id}`, income);
    return data;
}