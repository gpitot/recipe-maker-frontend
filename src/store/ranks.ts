import { createStore, createHook } from "react-sweet-state";
import API from "rest/api";
import { IRanks } from "../rest/ladder";

type State = {
  ranks: Array<IRanks>;
  loading: boolean;
};

const initialState: State = {
  ranks: [],
  loading: true,
};

const Store = createStore({
  initialState,
  actions: {
    initialLoad:
      (ladder_id: number) =>
      ({ getState, setState }) => {
        if (!getState().loading) return;
        API.ladder.getRanks({ ladder_id }).then(({ result }) => {
          setState({
            ranks: result,
            loading: false,
          });
        });
      },
  },
});

const useRanksStore = createHook(Store);

export { useRanksStore };
