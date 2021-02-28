import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
} from "rest/common";

export interface ITransactionsResponse {
  id: number;
  item: number;
  purchaser: string;
  purchase_date: string;
  payment_status: string;
}

const api = {
  getShop: () => {
    return axios
      .get<null, IJsonResponse<ITransactionsResponse>>(`${BASE_URL}/shop`)
      .then((res) => {
        return res.data;
      });
  },

  getTransactions: () => {
    return axios
      .get<null, IJsonResponse<ITransactionsResponse>>(`${BASE_URL}/shop/transactions`)
      .then((res) => {
        return res.data;
      });
  },

  addTransaction: () => {
    return axios
      .post<null, IJsonResponse<ITransactionsResponse>>(`${BASE_URL}/shop/transactions`)
      .then((res) => {
        return res.data;
      });
  },
};

export default api;
