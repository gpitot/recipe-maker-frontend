import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  IResultResponse,
  commonAxiosConfig,
} from "rest/common";

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  role: string;
  accessToken: string;
}

export interface IUserCreate {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  password2: string;
  photo?: string;
  phone: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserResetPassword {
  password: string;
  token: string;
}

export interface IUserGenerateReset {
  user_id: number;
}

interface IUserResponse extends IResultResponse {
  user: IUser;
}

interface IGenerateTokenResponse extends IResultResponse {
  result: {
    token: string;
  };
}

const api = {
  me: () => {
    return axios
      .get<null, IJsonResponse<IUserResponse>>(`${BASE_URL}/users/me`, {
        ...commonAxiosConfig,
        headers: {
          userCheck: true,
        },
      })
      .then((res) => {
        return res.data;
      });
  },

  get: (userid: string) => {
    return axios
      .get<null, IJsonResponse<IUserResponse>>(
        `${BASE_URL}/users/user/${userid}`,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  login: (data: IUserLogin) => {
    return axios
      .post<null, IJsonResponse<IUserResponse>>(
        `${BASE_URL}/users/login`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  create: (data: IUserCreate) => {
    return axios
      .post<null, IJsonResponse<IUserResponse>>(
        `${BASE_URL}/users/create`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  resetPassword: (data: IUserResetPassword) => {
    return axios
      .post<null, IJsonResponse<IResultResponse>>(
        `${BASE_URL}/users/reset`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  generateReset: (data: IUserGenerateReset) => {
    return axios
      .post<null, IJsonResponse<IGenerateTokenResponse>>(
        `${BASE_URL}/users/generate-reset`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },
};
export default api;
