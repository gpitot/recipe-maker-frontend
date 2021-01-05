import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";
import { IEvent } from "rest/events";
const URL = `${BASE_URL}/user_events`;

export interface IUserEvent {
  id: number;
  firstname: string;
  lastname: string;
  registered: string;
  event_id: number;
  paid: boolean;
  receipt: string;
  enabled: boolean;
}

export interface IUserEventResponse extends IResultResponse {
  result: Array<IUserEvent>;
}

export default {
  getUserEvents: (event_id: string) => {
    return axios
      .get<null, IJsonResponse<IUserEventResponse>>(`${URL}/${event_id}`)
      .then((res) => {
        return res.data;
      });
  },

  editUserEvent: (
    event: Pick<IUserEvent, "id" | "event_id" | "paid" | "enabled">
  ) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(URL, event, commonAxiosConfig)
      .then((res) => {
        return res.data;
      });
  },

  addUserEvent: (
    event: Pick<IUserEvent, "firstname" | "lastname" | "event_id">
  ) => {
    console.log(event);
    return axios
      .post<null, IJsonResponse<IResultResponse>>(URL, event, commonAxiosConfig)
      .then((res) => {
        return res.data;
      });
  },
};
