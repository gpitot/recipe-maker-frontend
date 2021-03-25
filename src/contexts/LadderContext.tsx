import React, { useCallback, createContext, useState } from "react";
import API from "rest/api";
import { IRanks, IMatches } from "rest/ladder";

const defaultLadderContext = {
  loadRanks: (ladderId: number): Promise<Array<IRanks>> => Promise.resolve([]),
  loadChallenges: (ladderId: number): Promise<Array<IMatches>> =>
    Promise.resolve([]),
  loadResults: (ladderId: number): Promise<Array<IMatches>> =>
    Promise.resolve([]),
  updateLadder: (ladderId: number, key: LadderKey, values: object): void =>
    undefined,
};

interface ILaddersState {
  [key: number]: {
    name: string;
    description: string;
    ranks: Array<IRanks> | null;
    challenges: Array<IMatches> | null;
    results: Array<IMatches> | null;
  };
}

interface IDataState {
  [ladderId: number]: {
    data: Array<IRanks>;
    loading: boolean;
    lastLoaded: number;
  };
}

type LadderKey = "ranks" | "challenges" | "results";

const LadderContext = createContext(defaultLadderContext);

const LadderProvider = ({ children }: { children: React.ReactNode }) => {
  const [ladders, setLadders] = useState<ILaddersState>({});

  const [ranks, setRanks] = useState<IDataState>({});
  const [challenges, setChallenges] = useState<IDataState>({});
  const [matches, setMatches] = useState<IDataState>({});

  const updateLadder = useCallback(
    (ladderId: number, key: LadderKey, values: object): void => {
      setLadders({
        ...ladders,
        [ladderId]: {
          ...ladders[ladderId],
          [key]: values,
        },
      });
    },
    [ladders]
  );

  const loadRanks = useCallback(
    (ladderId: number): Promise<Array<IRanks>> => {
      return new Promise((resolve, reject) => {
        try {
          const ranks = ladders[ladderId].ranks as Array<IRanks>;
          if (ranks !== undefined) {
            return resolve(ranks);
          }
        } catch (e) {}

        //api
        API.ladder
          .getRanks({
            ladder_id: ladderId,
          })
          .then(({ success, result }) => {
            if (success) {
              updateLadder(ladderId, "ranks", result);
              return resolve(result);
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    [updateLadder, ladders]
  );

  const loadMatches = useCallback(
    (ladderId: number, challenges: boolean): Promise<Array<IMatches>> => {
      return new Promise((resolve, reject) => {
        try {
          const matches = ladders[ladderId].challenges as Array<IMatches>;
          if (matches !== undefined) {
            return resolve(matches);
          }
        } catch (e) {}

        const matchType = challenges ? "challenges" : "results";

        //api
        API.ladder
          .getMatches({
            ladder_id: ladderId,
            challenges,
          })
          .then(({ success, result }) => {
            if (success) {
              updateLadder(ladderId, matchType, result);
              return resolve(result);
            }
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    [updateLadder, ladders]
  );

  const loadChallenges = useCallback(
    (ladderId: number) => {
      return loadMatches(ladderId, true);
    },
    [loadMatches]
  );

  const loadResults = useCallback(
    (ladderId: number) => {
      return loadMatches(ladderId, false);
    },
    [loadMatches]
  );

  return (
    <LadderContext.Provider
      value={{
        loadRanks,
        loadChallenges,
        loadResults,
        updateLadder,
      }}
    >
      {children}
    </LadderContext.Provider>
  );
};
export { LadderContext };
export default LadderProvider;
