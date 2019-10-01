import React from 'react';
import { Redirect, Route} from "react-router-dom";
import {getJsonWebToken} from "../../services/authService";

const ProtectedRoute = ({path, component:Component, ...rest}) => {
    
    const user = getJsonWebToken();
     
    return ( 
        <Route path={path} {...rest}
			render = { props => {
				if(!user) return <Redirect to="/login" />
					return <Component {...props} />
				}} 
        />
     );
}
 
export default ProtectedRoute;