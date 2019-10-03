import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

class Household extends Component {
    state = {  }
    render() { 
        return ( 
            <FormControl>
                <TextField
                        id="standard-name"
                        label="Email"
                        style={{ marginRight : "2em"}}
                        //value={name}
                        //onChange={}
                        margin="normal"
                        />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        );
    }
}
 
export default Household;