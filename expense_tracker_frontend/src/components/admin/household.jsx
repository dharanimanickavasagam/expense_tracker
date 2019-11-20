import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import _ from "lodash";

class Household extends Component {
  state = {
    currencyFormat: [{ USD: "$" }, { AUD: "$" }, { INR: "₹" }, { Euro: "€" }],
    selectedCurrency: ""
  };

  handleCurrencyFormat = event => {
    const selectedCurrency = event.target.value;
    this.setState({ selectedCurrency });
  };

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Currency Format
        </InputLabel>

        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          onChange={this.handleCurrencyFormat}
          value={this.state.selectedCurrency}
          displayEmpty
        >
          {this.state.currencyFormat.map(currencyFormat => (
            <MenuItem value={_.values(currencyFormat)[0]}>
              {`${_.keys(currencyFormat)} : ${_.values(currencyFormat)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default Household;
