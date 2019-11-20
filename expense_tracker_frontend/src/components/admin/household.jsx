import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import { connect } from "react-redux";
import { setCurrencyFormat } from "../../actions/currencyFormat";

class Household extends Component {
  state = {
    currencyFormat: [{ USD: "$" }, { AUD: "$" }, { INR: "₹" }, { Euro: "€" }],
    selectedCurrency: ""
  };

  handleCurrencyFormat = event => {
    const selectedCurrency = event.target.value;
    this.props.setCurrencyFormat(selectedCurrency);
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
          value={this.props.currencyFormat}
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
const mapStateToProps = state => {
  return {
    currencyFormat: state.currencyFormat.currencyFormat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrencyFormat: currencyFormat =>
      dispatch(setCurrencyFormat(currencyFormat))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Household);
