import { SET_CURRENCYFORMAT } from "../constants/constants";

const initialState = {
  currencyFormat: ""
};

const setCurrencyFormat = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENCYFORMAT:
      console.log("payload is ", payload);
      return Object.assign({}, state, {
        currencyFormat: payload
      });

    default:
      return state;
  }
};

export default setCurrencyFormat;
