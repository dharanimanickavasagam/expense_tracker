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
import Copyright from "./common/copyright"
import Joi from "joi-browser"
import _ from "lodash";
import {addUserService } from "../services/userService";


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  red : { 
    color : "red"
  }
});

class Signup extends Component {
  state =  { 
    name : "",
    email : "",
    password:"",
    errors: {}
  }
  constructor (props){
    super(props)
  }

  schema = { 
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(255).required()
  }
  

  validateFormDetails = async(event) => { 

    event.preventDefault();
    const options = {abortEarly : false};
    const {error} = Joi.validate({ 
       name : this.state.name,
       email : this.state.email, 
       password : this.state.password
    }, this.schema,options);

    if(!error) { 
      try { 
        const response =  await addUserService({ name : this.state.name,name : this.state.name,
        email : this.state.email, 
        password : this.state.password})
        return this.props.history.push('/login'); 
      }catch(error) { 
        if (error.response && error.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.email = error.response.data;
          this.setState({ errors });
          return;
        }
        return
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

  handleName = (event) => { 
    this.setState({name : event.target.value})
  };   

  handleEmail =(event) => { 
    this.setState({email : event.target.value})
  };

  handlePassword = (event) => { 
    this.setState({password : event.target.value})
  };

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
        Sign up
      </Typography>

      <form className={classes.form} noValidate onSubmit={ this.validateFormDetails}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              autoFocus
              onFocus={this.handleFocus}
              onChange={this.handleName}
            />
            <div className={classes.red}> 
            {this.state.errors.name &&
											_.values(this.state.errors.name)}
            </div>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onFocus={this.handleFocus}
              onChange={this.handleEmail}
            />
            <div className={classes.red}> 
            {this.state.errors.email &&
											_.values(this.state.errors.email)}
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              value ={this.state.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onFocus={this.handleFocus}
              onChange={this.handlePassword}
            />
            <div className={classes.red}> 
            {this.state.errors.password &&
											_.values(this.state.errors.password)}
            </div>
          </Grid>
          
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>

        <Grid container justify="flex-end">
          <Grid item>
            <NavLink to={"/login"} variant="body2">
              Already have an account? Sign in
            </NavLink>
          </Grid>
        </Grid>

      </form>
    </div>

    <Box mt={5}>
      <Copyright />
    </Box>

  </Container>
)}}

 
export default withStyles(styles)(Signup);
