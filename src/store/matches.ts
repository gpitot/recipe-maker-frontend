import { createStore, createHook } from "react-sweet-state";
import API from "rest/api";
import { IMatches } from "../rest/ladder";

type State = {
  matches: {
    [key: string]: Array<IMatches>;
  };
};

const initialState: State = {
  matches: {},
};

interface IInitialLoad {
  ladder_id?: number;
  isChallenge: boolean;
  player_id?: number;
}

export const translateParamsToKey = ({
  ladder_id,
  isChallenge,
  player_id,
}: IInitialLoad) => {
  return `${ladder_id ? ladder_id : 0}:${player_id}:${isChallenge ? 1 : 0}`;
};

const Store = createStore({
  initialState,
  actions: {
    // if challenges == true then we are using challenges, otherwise results
    initialLoad:
      ({ ladder_id, isChallenge, player_id }: IInitialLoad) =>
      ({ getState, setState }) => {
        const key = translateParamsToKey({ ladder_id, isChallenge, player_id });
        if (getState().matches[key]) return;
        API.ladder
          .getMatches({
            ladder_id,
            challenges: isChallenge,
            player_id,
          })
          .then((res) => {
            if (res.success) {
              setState({
                matches: {
                  ...getState().matches,
                  [key]: res.result,
                },
              });
            }
          });
      },
  },
});

const useMatchesStore = createHook(Store);

export { useMatchesStore };
