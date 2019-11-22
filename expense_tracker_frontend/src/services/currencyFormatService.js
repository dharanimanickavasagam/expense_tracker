import http from "../httpAxiosModule/httpAxiosModule";
import config from "../config.json";

export const getCurrencyFormatService = async () => {
  const { data } = await http.get(`${config.apiEndPoint}/currencyFormat`);
  return data;
};
