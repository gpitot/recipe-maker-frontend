import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";
const URL = `${BASE_URL}/user_events`;

export interface IUserEvent {
  id: number; //user event id
  user_id: number;
  firstname: string;
  lastname: string;
  registered: string;
  event_id: number;
  paid: boolean;
  receipt: string;
  enabled: boolean;
  photo: string;
  streak: number;
  vaccinated: boolean;
}

export interface IUserEventResponse extends IResultResponse {
  result: Array<IUserEvent>;
}

export interface IUserEventHistory {
  id: number;
  name: string;
  start: string;
}

interface IUserEventAddedResponse extends IResultResponse {
  result: IUserEvent;
}

interface IUserEventHistoryResponse extends IResultResponse {
  result: Array<IUserEventHistory>;
}

const api = {
  getUserEvents: (event_id: string) => {
    return axios
      .get<null, IJsonResponse<IUserEventResponse>>(`${URL}/${event_id}`)
      .then((res) => {
        return res.data;
      });
  },

  editUserEvent: (
    event: Pick<IUserEvent, "id" | "event_id" | "paid" | "enabled" | "user_id">
  ) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(URL, event, commonAxiosConfig)
      .then((res) => {
        return res.data;
      });
  },

  deleteUserEvent: (event: Pick<IUserEvent, "id">) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${URL}/remove`,
        event,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  addUserEvent: (event: Pick<IUserEvent, "event_id">) => {
    return axios
      .post<null, IJsonResponse<IUserEventAddedResponse>>(
        URL,
        event,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  addUserEventManually: (event: Pick<IUserEvent, "event_id" | "user_id">) => {
    return axios
      .post<null, IJsonResponse<IUserEventAddedResponse>>(
        `${URL}/manual-entry`,
        event,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  getUserHistory: (user_id: number) => {
    return axios
      .get<null, IJsonResponse<IUserEventHistoryResponse>>(
        `${URL}/user-history/${user_id}`
      )
      .then((res) => res.data);
  },
};

export default api;
