import axios from "axios";
import { IJsonResponse, BASE_URL } from "rest/common";

export interface IShop {
  id: number;
  name: string;
  description: string;
  image: string;
  category: ShopCategory;
  price: string;
  discount: number;
  stock: number;
}
export interface IShopResponse {
  result: Array<IShop>;
}

export interface ITransactionsResponse {
  result: {
    id: number;
    item: number;
    purchaser: string;
    purchase_date: string;
    payment_status: string;
  };
}

export enum ShopCategory {
  product = "product",
  coaching = "coaching",
}

const api = {
  getShop: (category: ShopCategory) => {
    return axios
      .get<null, IJsonResponse<IShopResponse>>(
        `${BASE_URL}/shop?category=${category}`
      )
      .then((res) => {
        return res.data;
      });
  },

  getTransactions: () => {
    return axios
      .get<null, IJsonResponse<ITransactionsResponse>>(
        `${BASE_URL}/shop/transactions`
      )
      .then((res) => {
        return res.data;
      });
  },

  addTransaction: () => {
    return axios
      .post<null, IJsonResponse<ITransactionsResponse>>(
        `${BASE_URL}/shop/transactions`
      )
      .then((res) => {
        return res.data;
      });
  },
};

export default api;
