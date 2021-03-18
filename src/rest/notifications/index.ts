import axios from "axios";
import { IJsonResponse, BASE_URL, commonAxiosConfig } from "rest/common";

export interface INotification {
  id: number;
  title: string;
  description: string;
  action_positive_text: string;
  action_positive_link: string;
  action_negative_text: string;
  action_negative_link: string;
}
export interface INotificationResponse {
  result: Array<INotification>;
  success: boolean;
}

const api = {
  getNotifications: () => {
    return axios
      .get<null, IJsonResponse<INotificationResponse>>(
        `${BASE_URL}/notifications`
      )
      .then((res) => {
        return res.data;
      });
  },

  acknowledgeNotification: (id: number) => {
    return axios
      .post<null, IJsonResponse<INotificationResponse>>(
        `${BASE_URL}/notifications`,
        { id },
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },
};

export default api;
