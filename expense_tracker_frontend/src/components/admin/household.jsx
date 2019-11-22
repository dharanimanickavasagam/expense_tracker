import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import _ from "lodash";
import { connect } from "react-redux";
import { setCurrencyFormat } from "../../actions/currencyFormat";
import { getCurrencyFormatService } from "../../services/currencyFormatService";
import {
  getSelectedCurrencyService,
  changeSelectedCurrencyService
} from "../../services/household";

class Household extends Component {
  state = {
    currencyFormat: [],
    selectedCurrency: ""
  };

  handleCurrencyFormat = event => {
    const selectedCurrency = event.target.value;
    // .match(/:(.*)/g)
    // .pop()
    // .replace(":", "");

    changeSelectedCurrencyService({ currencyFormat: selectedCurrency });
    this.props.setCurrencyFormat(selectedCurrency);
    this.setState({ selectedCurrency });
  };

  async componentDidMount() {
    const res = await getCurrencyFormatService();
    const currencyFormat = await res.map(datum => _.omit(datum, ["_id"]));

    const selectedCurrency = await getSelectedCurrencyService();
    this.setState({ currencyFormat, selectedCurrency });
  }

  render() {
    return (
      <FormControl>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Currency Format
        </InputLabel>

        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          onChange={this.handleCurrencyFormat}
          value={this.state.selectedCurrency}
        >
          {this.state.currencyFormat.map(currencyFormat => (
            <MenuItem
              value={`${_.join(_.values(currencyFormat.name), "")}:${_.values(
                currencyFormat.symbol
              )}`}
            >
              {`${_.join(_.values(currencyFormat.name), "")}:${_.values(
                currencyFormat.symbol
              )}`}
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
    setCurrencyFormat: selectedCurrency =>
      dispatch(setCurrencyFormat(selectedCurrency))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Household);
