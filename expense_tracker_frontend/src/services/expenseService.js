import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getExpenseService = async() => {
   const {data} = await http.get(config.apiEndPoint + "/expense");
   return data;
}

export const addExpenseService = async(expense) => {
    const {data} = await http.post(config.apiEndPoint + "/expense", expense);
    return data;
}

export const deleteExpenseService = async(expenseID) => {
    const {data} = await http.delete(config.apiEndPoint + "/expense/" +
        `${expenseID}`);
        return data;
}

export const updateExpenseService = async(expense) => {
    const id = expense._id;
    const {data} = await http.put(config.apiEndPoint + "/expense/" +
        `${id}`, expense);
        return data;
}