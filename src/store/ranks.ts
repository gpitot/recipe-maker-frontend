import { createStore, createHook } from "react-sweet-state";
import API from "rest/api";
import { IRanks } from "../rest/ladder";

type State = {
  ranks: {
    [key: string]: { data: Array<IRanks>; loading: boolean };
  };
};

const initialState: State = {
  ranks: {},
};

const Store = createStore({
  initialState,
  actions: {
    initialLoad:
      (ladder_id: number) =>
      ({ getState, setState }) => {
        if (getState().ranks[ladder_id]) return;

        setState({
          ranks: {
            ...getState().ranks,
            [ladder_id]: {
              data: [],
              loading: true,
            },
          },
        });

        API.ladder.getRanks({ ladder_id }).then(({ result }) => {
          setState({
            ranks: {
              ...getState().ranks,
              [ladder_id]: {
                data: result,
                loading: false,
              },
            },
          });
        });
      },
  },
});

const useRanksStore = createHook(Store);

export { useRanksStore };
