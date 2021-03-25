import React, { useCallback, createContext, useState } from "react";
import API from "rest/api";
import { IRanks, IMatches } from "rest/ladder";

interface IMatchState {
  [key: number]: IMatchObject;
}

interface IMatchObject {
  data: Array<IMatches>;
  loading: boolean;
  lastLoaded: number;
}

interface IRanksState {
  [key: number]: IRanksObject;
}

interface IRanksObject {
  data: Array<IRanks>;
  loading: boolean;
  lastLoaded: number;
}

const DATA_REFRESH_INTERVAL = 60000; // 1 minute

const defaultLadderContext = {
  loadRanks: (ladderId: number): Promise<IRanksObject> =>
    Promise.resolve({
      data: [],
      loading: false,
      lastLoaded: 0,
    }),
  loadChallenges: (ladderId: number): Promise<IMatchObject> =>
    Promise.resolve({
      data: [],
      loading: false,
      lastLoaded: 0,
    }),
  loadResults: (ladderId: number): Promise<IMatchObject> =>
    Promise.resolve({
      data: [],
      loading: false,
      lastLoaded: 0,
    }),

  updateRanks: (
    ladderId: number,
    data: Array<IRanks>,
    loading = false
  ): IRanksObject => ({
    data: [],
    loading: false,
    lastLoaded: 0,
  }),

  updateChallenges: (
    ladderId: number,
    data: Array<IMatches>,
    loading = false
  ): IMatchObject => ({
    data: [],
    loading: false,
    lastLoaded: 0,
  }),

  updateResults: (
    ladderId: number,
    data: Array<IMatches>,
    loading = false
  ): IMatchObject => ({
    data: [],
    loading: false,
    lastLoaded: 0,
  }),
};

const LadderContext = createContext(defaultLadderContext);

const LadderProvider = ({ children }: { children: React.ReactNode }) => {
  const [ranks, setRanks] = useState<IRanksState>({});
  const [challenges, setChallenges] = useState<IMatchState>({});
  const [results, setResults] = useState<IMatchState>({});

  const updateRanks = (
    ladderId: number,
    data: Array<IRanks>,
    loading = false
  ): IRanksObject => {
    const lastLoaded = Date.now();
    setRanks({
      ...ranks,
      [ladderId]: {
        data,
        loading,
        lastLoaded,
      },
    });
    return {
      data,
      loading,
      lastLoaded,
    };
  };

  const updateChallenges = (
    ladderId: number,
    data: Array<IMatches>,
    loading = false
  ): IMatchObject => {
    const lastLoaded = Date.now();
    setChallenges({
      ...challenges,
      [ladderId]: {
        data,
        loading,
        lastLoaded,
      },
    });
    return {
      data,
      loading,
      lastLoaded,
    };
  };

  const updateResults = (
    ladderId: number,
    data: Array<IMatches>,
    loading = false
  ): IMatchObject => {
    const lastLoaded = Date.now();
    setResults({
      ...results,
      [ladderId]: {
        data,
        loading,
        lastLoaded,
      },
    });
    return {
      data,
      loading,
      lastLoaded,
    };
  };

  const loadRanks = (ladderId: number): Promise<IRanksObject> => {
    return new Promise((resolve, reject) => {
      let oldData: Array<IRanks> = [];
      if (ranks[ladderId]) {
        const { data, loading, lastLoaded } = ranks[ladderId];
        oldData = data;
        if (loading) return resolve(ranks[ladderId]);

        if (Date.now() - lastLoaded < DATA_REFRESH_INTERVAL) {
          return resolve(ranks[ladderId]);
        }
      }

      updateRanks(ladderId, oldData, true);
      //api
      API.ladder
        .getRanks({
          ladder_id: ladderId,
        })
        .then(({ success, result }) => {
          if (success) {
            return resolve(updateRanks(ladderId, result));
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  const loadMatches = (
    ladderId: number,
    matchType: boolean
  ): Promise<IMatchObject> => {
    return new Promise((resolve, reject) => {
      let oldData: Array<IMatches> = [];

      const matches = matchType ? challenges : results;

      const updateMatches = matchType ? updateChallenges : updateResults;

      if (matches[ladderId]) {
        const { data, loading, lastLoaded } = matches[ladderId];
        oldData = data;
        if (loading) return resolve(matches[ladderId]);

        if (Date.now() - lastLoaded < DATA_REFRESH_INTERVAL) {
          return resolve(matches[ladderId]);
        }
      }

      updateMatches(ladderId, oldData, true);
      //api
      API.ladder
        .getMatches({
          ladder_id: ladderId,
          challenges: matchType,
        })
        .then(({ success, result }) => {
          if (success) {
            return resolve(updateMatches(ladderId, result));
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  const loadChallenges = (ladderId: number) => {
    return loadMatches(ladderId, true);
  };

  const loadResults = (ladderId: number) => {
    return loadMatches(ladderId, false);
  };

  return (
    <LadderContext.Provider
      value={{
        loadRanks,
        loadChallenges,
        loadResults,
        updateRanks,
        updateChallenges,
        updateResults,
      }}
    >
      {children}
    </LadderContext.Provider>
  );
};
export { LadderContext };
export default LadderProvider;
