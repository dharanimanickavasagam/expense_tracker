import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const DialogComponent = ({
	modalToggle,
	handleClose,
	dialogTitle,
	dialogContentText,
	buttonText
}) => {
	return (
		<Dialog open={modalToggle} onClose={handleClose}>
			<DialogTitle>{dialogTitle}</DialogTitle>
			<DialogContent>
				<DialogContentText>{dialogContentText}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="primary" onClick={handleClose}>
					{buttonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogComponent;
