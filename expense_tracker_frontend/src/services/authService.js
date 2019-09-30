import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

// authenticate user 
export const authenticateUserService = async (user) => { 
    const {data : jwt} = await http.post( config.apiEndPoint + "/auth" , user);
    localStorage.setItem("Token",jwt);
}

// get the jwt of user 
export const getJsonWebToken = () => { 
    return localStorage.getItem("Token");
}

// logout user 
export const removeJsonWebToken = () => { 
    localStorage.removeItem("Token")
}