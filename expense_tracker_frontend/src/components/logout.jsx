import React from 'react';
import {removeJsonWebToken} from "../services/authService"; 

const Logout = (props) => {
    removeJsonWebToken();
    window.location = "/login"
    return ("Logging out")
}
 
export default Logout;