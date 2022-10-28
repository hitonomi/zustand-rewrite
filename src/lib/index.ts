import { useState } from "react";

export const create = <TState extends Record<string, unknown>>(
  stateCreator: (
    set: (reducer: (prevState: TState) => Partial<TState>) => Partial<TState>
  ) => TState
) => {
  let globalState: TState;

  const set = (
    reducer: (prevState: TState) => Partial<TState>
  ): Partial<TState> => {
    const newPartialState = reducer(globalState);

    globalState = { ...globalState, ...newPartialState };

    return globalState;
  };

  globalState = stateCreator(set);

  const useStore = (
    selector: (state: TState | undefined) => keyof TState | undefined
  ) => {
    const [state, setState] = useState();

    return selector(state);
  };

  return useStore;
};
