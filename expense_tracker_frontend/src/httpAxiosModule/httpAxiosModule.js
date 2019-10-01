import axios from "axios";
import {getJsonWebToken} from "../services/authService"

axios.defaults.headers.common["x-auth-token"] = getJsonWebToken(); 

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};