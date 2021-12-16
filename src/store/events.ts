import { createStore, createHook } from "react-sweet-state";
import API from "rest/api";
import { IEvent } from "../rest/events";

type State = {
  events: Array<IEvent>;
  loading: boolean;
};

const initialState: State = {
  events: [],
  loading: true,
};

const Store = createStore({
  initialState,
  actions: {
    initialLoad:
      () =>
      ({ getState, setState }) => {
        if (!getState().loading) return;
        API.events.getEvents().then(({ result }) => {
          setState({
            events: result,
            loading: false,
          });
        });
      },
  },
});

const useEventsStore = createHook(Store);

export { useEventsStore };
