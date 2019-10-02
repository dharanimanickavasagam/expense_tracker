import React from 'react';
import styled from "styled-components";
import {Drawer} from "@material-ui/core";
import Button from '@material-ui/core/Button';


const LeftAnchorDrawer = ({open, component:Component, label, onClick, buttonName, ...rest}) => {
    const StyledDrawer = styled(Drawer)`
		.MuiDrawer-paperAnchorLeft {
			right: 70%;
		}
    `;
    
    return ( 
        <StyledDrawer open={open} {...rest}>
            {Component}
            <Button
                label={label}
                onClick={onClick}
            >
                {buttonName}
            </Button>
    </StyledDrawer>
     );
}
 
export default LeftAnchorDrawer;