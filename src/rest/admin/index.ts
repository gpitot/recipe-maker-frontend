import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";
import { IUser } from "../users";

interface ISocialSignups extends Pick<IUser, "id" | "firstname" | "lastname"> {
  count: number;
}

enum MessageKeys {
  "social-freebie-reminder" = "social-freebie-reminder",
  "social-recent-user" = "social-recent-user",
}

const api = {
  getSocialSignups: (order: "ASC" | "DESC" = "DESC", limit: number = 10) => {
    return axios
      .get<null, IJsonResponse<ISocialSignups>>(
        `${BASE_URL}/admin/social-signups?order=${order}&limit=${limit}`
      )
      .then((res) => {
        return res.data;
      });
  },

  getPotentialSocials: (mode: "RECENT" | "FREEBIE" = "FREEBIE") => {
    return axios
      .get<
        null,
        IJsonResponse<Pick<IUser, "id" | "firstname" | "lastname" | "phone">>
      >(`${BASE_URL}/admin/potential-socials?mode=${mode}`)
      .then((res) => {
        return res.data;
      });
  },

  sendGroupMessage: (users: IUser[], messageKey: MessageKeys) => {
    return axios
      .post<null, IJsonResponse<IResultResponse>>(
        `${BASE_URL}/admin/send-group-message`,
        {
          users,
          messageKey,
        },
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },
};

export default api;
