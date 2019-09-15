import React from "react";
import { Drawer, Button } from "@material-ui/core";

const DrawerToggle = ({
	open,
	drawToggleFor,
	component,
	labelName,
	onClick,
	...rest
}) => {
	return (
		<Drawer {...rest} open={open}>
			<component />
			<Button label={labelName} onClick={() => onClick("drawToggleFor")}>
				Close
			</Button>
		</Drawer>
	);
};

export default DrawerToggle;
