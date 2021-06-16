import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";

export enum ReminderType {
  "pending-matches" = "pending-matches",
  "pending-playing" = "pending-playing",
  "pending-result" = "pending-result",
}

export interface IReminder {
  player_1: number;
  player_2: number;
  reminderType: ReminderType;
}

export interface IRemindersSent {
  user_id: number;
  message: string;
  notification_date: string;
  firstname: string;
  lastname: string;
}

interface IRemindersSentResponse extends IResultResponse {
  result: Array<IRemindersSent>;
}

const api = {
  remindPlayers: (data: IReminder) => {
    return axios
      .post<null, IJsonResponse<IResultResponse>>(
        `${BASE_URL}/notifications`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  getRemindersSent: () => {
    return axios
      .get<null, IJsonResponse<IRemindersSentResponse>>(
        `${BASE_URL}/notifications`
      )
      .then((res) => {
        return res.data;
      });
  },
};

export default api;
