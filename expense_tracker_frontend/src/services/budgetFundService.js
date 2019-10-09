import http from "../httpAxiosModule/httpAxiosModule"; 
import config from "../config.json";

export const getBudgetFunds = async() => { 
    const {data} = await http.get(`${config.apiEndPoint}`+ "/budget");
    return data;
}

export const updateBudgetFunds = async(budget) => { 
    const id = budget._id;
    const {data} = await http.put(`${config.apiEndPoint}`+ "/budget/" +`${budget._id}` , budget);
    return data;
}

