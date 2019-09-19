import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TypoGraphy from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const DialogComponent = ({
	modalToggle,
	handleClose,
	dialogTitle,
	dialogContentText,
	buttonText
}) => {
	return (
		<Dialog open={modalToggle} onClose={handleClose}>
			<Paper>
				<AppBar color="primary" position="static">
					<Toolbar>
						<TypoGraphy>
							<DialogTitle>{dialogTitle}</DialogTitle>
						</TypoGraphy>
					</Toolbar>
				</AppBar>
			</Paper>

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
