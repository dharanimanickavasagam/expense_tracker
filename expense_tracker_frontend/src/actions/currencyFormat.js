import { SET_CURRENCYFORMAT } from "../constants/constants";
import { getSelectedCurrencyService } from "../services/household";

export const setCurrencyFormat = payload => {
  return function(dispatch) {
    return getSelectedCurrencyService().then(data => {
      dispatch({
        type: SET_CURRENCYFORMAT,
        payload: data
      });
    });
  };
};
