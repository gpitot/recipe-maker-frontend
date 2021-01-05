import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";

export interface IEvent {
  description: string;
  enabled: boolean;
  id: number;
  name: string;
  open: string;
  spots: number;
  start: string;
}

interface IEventsResponse extends IResultResponse {
  result: Array<IEvent>;
}

interface IEventResponse extends IResultResponse {
  result: IEvent;
}

export default {
  getLadder: () => {
    return axios
      .get<null, IJsonResponse<unknown>>(`/.netlify/functions/ranks`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  },
};
