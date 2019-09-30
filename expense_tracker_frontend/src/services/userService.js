import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json"; 

export const getUserService = () => { 
    return http.get(config.apiEndPoint + "/user"); 
}

export const addUserService = (user) => { 
    return http.post(config.apiEndPoint+ "/user", user )
}

export const deleteUserService = id => { 
    return http.delete(config.apiEndPoint + `/user/${id}`)
}

export const updateUserService = user => { 
    const id = user.id;
    return http.put(config.apiEndPoint + `/user/${id}`, user )
}
