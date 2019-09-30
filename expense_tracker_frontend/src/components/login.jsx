import React,{Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {  NavLink } from "react-router-dom";
import Copyright from "./common/copyright";
import Joi from "joi-browser"
import _ from "lodash";
import {authenticateUserService} from "../services/authService";


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  red : { 
    color : "red"
  }
});


class Login extends Component {
  state = { 
    email : "",
    password:"",
    errors : {}
  }
 
  schema = {
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(255).required()
  };

  validateFormDetails = async (event) => { 
    event.preventDefault();
    const options = {abortEarly : false};
    const {error} = Joi.validate({ 
       email : this.state.email,
       password : this.state.password
    }, this.schema,options);

    if(!error){
      try { 
        await authenticateUserService({email : this.state.email,
            password : this.state.password});
        return window.location = "/"
      } catch(error) { 
          if (error.response && error.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.email = error.response.data;
            this.setState({ errors });
            return;
          }
          return;
      }
    }
     
    const errors = { ...this.state.errors };

		error.details.map(errorDetails => {
			const errorState = errorDetails.message.match(/"(.*?)"/);
			errors[errorState[1]] = errorDetails.message;
			this.setState({ errors });
			return errorDetails.message;
		});

  }

  handleFocus = () => {
		this.setState({ errors: {} });
	};

  handleEmail =(event) => { 
    this.setState({email : event.target.value})
  }

  handlePassword = (event) => { 
    this.setState({password : event.target.value})
  }

  render() { 
    const {classes} = this.props;

    return ( 
      <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate onSubmit={this.validateFormDetails}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onFocus={this.handleFocus}
            onChange={this.handleEmail}
            value={this.state.email}
          />
          <div className={classes.red}> 
            {this.state.errors.email &&
											_.values(this.state.errors.email)}
            </div>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onFocus={this.handleFocus}
            onChange={this.handlePassword}
            value={this.state.password}
          />
           <div className={classes.red}> 
            {this.state.errors.password &&
											_.values(this.state.errors.password)}
            </div>
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
           
            <Grid item>
              <NavLink to={"/signup"} variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
     );
  }
}
 
export default withStyles(styles)(Login);