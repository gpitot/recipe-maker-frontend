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
  streak: number;
  accessToken: string;
  phone?: string;
  email?: string;
  vaccinated?: boolean;
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

export interface IAdminGenerateUserPasswordReset {
  user_id: number;
}

export interface IUserGenerateUserPasswordReset {
  email: string;
}

interface IUserResponse extends IResultResponse {
  user: IUser;
}

interface IGenerateTokenResponse extends IResultResponse {
  result: {
    token: string;
  };
}

export interface ISearchUser {
  id: number;
  email: string;
  phone: string;
  firstname: Pick<IUser, "firstname">;
  lastname: Pick<IUser, "lastname">;
  streak: number;
}
interface ISearchUserResponse extends IResultResponse {
  result: Array<ISearchUser>;
}

export interface IStreakUser {
  streak: number;
}

interface IStreakUserResponse extends IResultResponse {
  result: IStreakUser;
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

  get: (userid: number) => {
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

  adminGenerateReset: (data: IAdminGenerateUserPasswordReset) => {
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

  userGenerateReset: (data: IUserGenerateUserPasswordReset) => {
    return axios
      .post<null, IJsonResponse<IResultResponse>>(
        `${BASE_URL}/users/user-generate-reset`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  search: (query: string) => {
    return axios
      .get<null, IJsonResponse<ISearchUserResponse>>(
        `${BASE_URL}/users/search?q=${query}`,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  getMyStreak: () => {
    return axios
      .get<null, IJsonResponse<IStreakUserResponse>>(
        `${BASE_URL}/users/streak`,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  editUser: (user: IUser) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${BASE_URL}/users/`,
        { user },
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },
};
export default api;
