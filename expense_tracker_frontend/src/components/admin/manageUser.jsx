import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {addUserService} from "../../services/userService"


import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  }
}));



function getSteps() {
  return ['User Details', 'Admin Configuration', 'Create'];
}



export default function ManageUser() {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
 
  const handleName = (event) => {     
    setName(event.target.value); 
  }
 
  const handleEmail = (event) => {     
    setEmail(event.target.value); 
  }

  const handlePassword = (event) => {     
    setPassword(event.target.value); 
  }
  

  const [isAdmin , setIsAdmin] = useState(false);

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();


  const handleChange = () => {
    setIsAdmin(! isAdmin);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
  
      case 0:
        return (  
        <> <FormControl>
        <TextField
                id="standard-name"
                label="Name"
                style={{ marginRight : "2em"}}
                value={name}
                onChange={handleName}
                margin="normal"
               
            /> 
            <FormHelperText id="my-helper-text">
               here
            </FormHelperText>
    </FormControl>

    <FormControl>
        <TextField
                id="standard-name"
                label="Email"
                style={{ marginRight : "2em"}}
                value={email}
                onChange={handleEmail}
                margin="normal"
                />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
    </FormControl>


    <FormControl>
        <TextField
                id="standard-name"
                label="Password"
                type="password"
                style={{ marginRight : "2em"}}
                value={password}
                onChange={handlePassword}
                margin="normal"
            />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
    </FormControl>

    </>)
  
      case 1:
        return (
            <FormControlLabel
        control={
            <Checkbox
            checked={isAdmin}
            onChange={handleChange}
            value="isAdmin"
            />
        }
        label="Admin"
      />
           
          );
  
      case 2:
        return <Button variant="contained" color="primary" className={classes.button} 
                onClick={ () => addUserService({
                    name ,
                    email ,
                    password ,
                    isAdmin 
                })}>
                    Create User 
                </Button>

      default:
        return 'Unknown step';
    }
  }
  

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Create" : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
