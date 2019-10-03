import http from "../httpAxiosModule/httpAxiosModule";
import api from "../config.json"

export const getExpenseTypeService = async() => {
    const {data} = await http.get(api.apiEndPoint + "/expenseType");
    return data;
}

export const addExpenseTypeService = async(expenseType) => {
    const {data} = await http.post(api.apiEndPoint + "/expenseType", expenseType);
    return data;
}

export const deleteExpenseTypeService = async(expenseTypeID) => {
    const {data} = await http.delete(api.apiEndPoint + "/expenseType/" +
        `${expenseTypeID}`);
        return data; 
}

export const updateExpenseTypeService = async(expenseType) => {
    const _id = expenseType._id;
    const {data} =  await http.put(api.apiEndPoint + "/expenseType/" +
        `${_id}`, expenseType);
    return data;
}