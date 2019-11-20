import { SET_CURRENCYFORMAT } from "../constants/constants";

const initialState = {
  currencyFormat: ""
};

const setCurrencyFormat = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENCYFORMAT:
      return Object.assign({}, state, {
        currencyFormat: payload
      });

    default:
      return state;
  }
};

export default setCurrencyFormat;
