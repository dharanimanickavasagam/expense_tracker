import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getSelectedCurrencyService = async () => {
  const { data } = await http.get(`${config.apiEndPoint}/household`);
  return data[0].currencyFormat;
};

export const changeSelectedCurrencyService = async currencyFormat => {
  const { data } = await http.post(
    `${config.apiEndPoint}/household`,
    currencyFormat
  );
  return data;
};
