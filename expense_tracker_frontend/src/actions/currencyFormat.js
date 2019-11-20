import { SET_CURRENCYFORMAT } from "../constants/constants";

export const setCurrencyFormat = payload => {
  return {
    type: SET_CURRENCYFORMAT,
    payload
  };
};
