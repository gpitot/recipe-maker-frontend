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
};

export default api;
