import { createStore, createHook } from "react-sweet-state";
import API from "rest/api";
import { IMatches } from "../rest/ladder";

type State = {
  challenges: Array<IMatches>;
  loadingChallenges: boolean;

  results: Array<IMatches>;
  loadingResults: boolean;
};

const initialState: State = {
  challenges: [],
  loadingChallenges: true,
  results: [],
  loadingResults: true,
};

interface IInitialLoad {
  ladder_id?: number;
  isChallenge: boolean;
  player_id?: number;
}

const Store = createStore({
  initialState,
  actions: {
    // if challenges == true then we are using challenges, otherwise results
    initialLoad:
      ({ ladder_id, isChallenge, player_id }: IInitialLoad) =>
      ({ getState, setState }) => {
        if (!getState().loadingChallenges && isChallenge) return;
        if (!getState().loadingResults && !isChallenge) return;

        API.ladder
          .getMatches({
            ladder_id,
            challenges: isChallenge,
            player_id,
          })
          .then((res) => {
            if (res.success) {
              if (isChallenge) {
                setState({
                  challenges: res.result,
                  loadingChallenges: false,
                });
              } else {
                setState({
                  results: res.result,
                  loadingResults: false,
                });
              }
            }
          });
      },
  },
});

const useMatchesStore = createHook(Store);

export { useMatchesStore };
