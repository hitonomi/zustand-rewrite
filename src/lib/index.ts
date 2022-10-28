import { useEffect, useState } from "react";

export const create = <TState extends Record<string, unknown>>(
  stateCreator: (
    set: (reducer: (prevState: TState) => Partial<TState>) => Partial<TState>
  ) => TState
) => {
  let globalState: TState;

  const listeners: Set<(state: TState) => void> = new Set();

  const set = (
    reducer: (prevState: TState) => Partial<TState>
  ): Partial<TState> => {
    const newPartialState = reducer(globalState);

    globalState = { ...globalState, ...newPartialState };

    listeners.forEach((listener) => listener(globalState));

    return globalState;
  };

  globalState = stateCreator(set);

  const subscribe = (listener: any) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const useStore = <TSelectedState extends TState[keyof TState]>(
    selector: (state: TState) => TSelectedState
  ) => {
    const [state, setState] = useState();

    useEffect(() => {
      const unsubscribe = subscribe(setState);

      return () => unsubscribe();
    }, []);

    return selector(state || globalState);
  };

  return useStore;
};
