import axios from "axios";
import {
  IJsonResponse,
  BASE_URL,
  commonAxiosConfig,
  IResultResponse,
} from "rest/common";
import { IUser } from "../users";

export interface ILadders extends IResultResponse {
  id: number;
  name: string;
  description: string;
}

interface ILaddersResponse {
  result: Array<ILadders>;
}

export interface IMatches {
  id: number;
  player_1: number;
  player_2: number;
  challenge_date: string;
  match_date: string;
  player_2_games: number;
  player_1_games: number;
  player_1_paid: boolean;
  player_2_paid: boolean;
  approved: boolean;
  accepted: boolean;
  player_1_firstname: Pick<IUser, "firstname">;
  player_1_lastname: Pick<IUser, "lastname">;
  player_1_photo: string;
  player_2_firstname: Pick<IUser, "firstname">;
  player_2_lastname: Pick<IUser, "lastname">;
  player_2_photo: string;
}

interface IMatchesResponse extends IResultResponse {
  result: Array<IMatches>;
}

export interface IRanks {
  recent_change: number;
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
}
interface IRanksResponse extends IResultResponse {
  result: Array<IRanks>;
}

interface IGetMatchesProps {
  ladder_id?: number;
  player_id?: number;
  challenges?: boolean;
  waitingForResult?: boolean;
}

interface IChallengeUserProps {
  ladder_id: number;
  player_2: number;
}

const LADDER_URL = `${BASE_URL}/ladder`;

const api = {
  getLadders: () => {
    return axios
      .get<null, IJsonResponse<ILaddersResponse>>(LADDER_URL)
      .then((res) => {
        return res.data;
      });
  },

  getMatches: ({
    ladder_id,
    player_id,
    challenges = false,
    waitingForResult = false,
  }: IGetMatchesProps) => {
    const matchUrl = new URL(`${LADDER_URL}/matches`);
    if (player_id) {
      matchUrl.searchParams.set("player_id", player_id.toString());
    }
    if (ladder_id) {
      matchUrl.searchParams.set("ladder_id", ladder_id.toString());
    }
    matchUrl.searchParams.set("challenges", challenges.toString());
    matchUrl.searchParams.set("waitingForResult", waitingForResult.toString());
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(matchUrl.toString())
      .then((res) => {
        return res.data;
      });
  },

  getAwaitResults: (userid: number) => {
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(
        `${LADDER_URL}/awaitresults/${userid}`
      )
      .then((res) => {
        return res.data;
      });
  },

  adminGetApprovals: () => {
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(
        `${LADDER_URL}/admin/approvals`
      )
      .then((res) => {
        return res.data;
      });
  },
  adminGetPendingAccepted: () => {
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(
        `${LADDER_URL}/admin/pending-accepted`
      )
      .then((res) => {
        return res.data;
      });
  },
  adminGetPendingPlaying: () => {
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(
        `${LADDER_URL}/admin/pending-playing`
      )
      .then((res) => {
        return res.data;
      });
  },
  adminGetPendingResults: () => {
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(
        `${LADDER_URL}/admin/pending-results`
      )
      .then((res) => {
        return res.data;
      });
  },

  getUpcoming: () => {
    return axios
      .get<null, IJsonResponse<IMatchesResponse>>(`${LADDER_URL}/upcoming`)
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
      .post<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/${ladder_id}/challenge`,
        {
          player_2,
        },
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeAccept: (data: { match_id: number }) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/challenge/accept`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeDecline: (data: { match_id: number }) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/challenge/decline`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeTime: (data: { match_id: number; time: string }) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/challenge/time`,
        data,
        commonAxiosConfig
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
      .put<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/challenge/result`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeApprove: (data: { match_id: number }) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/challenge/approve`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  challengeAdminEdit: (data: {
    match_id: number;
    accepted: boolean;
    player_1_games: number;
    player_2_games: number;
    match_date: string;
  }) => {
    return axios
      .put<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/challenge/edit`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },

  signUp: (data: { ladder_id: number }) => {
    return axios
      .post<null, IJsonResponse<IResultResponse>>(
        `${LADDER_URL}/signup`,
        data,
        commonAxiosConfig
      )
      .then((res) => {
        return res.data;
      });
  },
};

export default api;
