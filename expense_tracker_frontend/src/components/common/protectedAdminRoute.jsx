import React from 'react';
import { Redirect, Route} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {getJsonWebToken} from "../../services/authService";

const ProtectedAdminRoute = ({path, component:Component, ...rest}) => {
    
    const user = getJsonWebToken();
    let userDetails; 
	if(user) { 
			userDetails = jwtDecode(user);
	}
     
    return ( 
        <Route path={path}
            render = {props => {
                if(!user) return <Redirect to="/login" />
                if (user && userDetails.isAdmin) return <Component {...props} />
                return <Redirect to ="/not-found" />
            }}  
        />
     );
}
 
export default ProtectedAdminRoute;