import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";

export interface IRanksResponse {
  results: Array<{
    id: number;
    name: string;
    description: string;
  }>;
}

interface IGetMatchesProps {
  ladder_id: number;
  player_id?: string;
  challenges: boolean;
}

interface IChallengeUserProps {
  ladder_id: number;
  player_2: string;
}

const LADDER_URL = `${BASE_URL}/ladder`;

export default {
  getLadders: () => {
    return axios
      .get<null, IJsonResponse<IRanksResponse>>(LADDER_URL)
      .then((res) => {
        return res.data;
      });
  },

  getMatches: ({
    ladder_id,
    player_id,
    challenges = false,
  }: IGetMatchesProps) => {
    const matchUrl = new URL(`${LADDER_URL}/${ladder_id}/matches`);
    if (player_id) {
      matchUrl.searchParams.set("player_id", player_id);
    }
    matchUrl.searchParams.set("challenges", challenges.toString());
    return axios
      .get<null, IJsonResponse<IRanksResponse>>(matchUrl.toString())
      .then((res) => {
        return res.data;
      });
  },

  getRanks: ({ ladder_id }: { ladder_id: number }) => {
    return axios
      .get<null, IJsonResponse<IRanksResponse>>(
        `${LADDER_URL}/${ladder_id}/ranks`
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeUser: ({ ladder_id, player_2 }: IChallengeUserProps) => {
    return axios
      .post<null, IJsonResponse<IRanksResponse>>(
        `${LADDER_URL}/${ladder_id}/challenge`,
        {
          player_2,
        },
        {
          withCredentials: true,
          ...commonAxiosConfig,
        }
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeAccept: (data: { match_id: number }) => {
    return axios
      .put<null, IJsonResponse<IRanksResponse>>(
        `${LADDER_URL}/challenge/accept`,
        data,
        {
          withCredentials: true,
          ...commonAxiosConfig,
        }
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeTime: (data: { match_id: number; time: string }) => {
    return axios
      .put<null, IJsonResponse<IRanksResponse>>(
        `${LADDER_URL}/challenge/time`,
        data,
        {
          withCredentials: true,
          ...commonAxiosConfig,
        }
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeResult: (data: {
    match_id: number;
    player_1_games: number;
    player_2_games: number;
  }) => {
    return axios
      .put<null, IJsonResponse<IRanksResponse>>(
        `${LADDER_URL}/challenge/result`,
        data,
        {
          withCredentials: true,
          ...commonAxiosConfig,
        }
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeApprove: (data: { match_id: number }) => {
    return axios
      .put<null, IJsonResponse<IRanksResponse>>(
        `${LADDER_URL}/challenge/approve`,
        data,
        {
          withCredentials: true,
          ...commonAxiosConfig,
        }
      )
      .then((res) => {
        return res.data;
      });
  },
};
