import React, { createContext, useContext, useReducer } from "react";
import { initialState, taskReducer } from "./reducer";
import { ReservaListState, ReservasDispatch } from "./types";
const ReservasStateContext = createContext<ReservaListState>(initialState);
const ReservasDispatchContext = createContext<ReservasDispatch>(() => {});
export const ReservasProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <ReservasStateContext.Provider value={state}>
      <ReservasDispatchContext.Provider value={dispatch}>
        {children}
      </ReservasDispatchContext.Provider>
    </ReservasStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
export const useReservasState = () => useContext(ReservasStateContext);
export const useReservasDispatch = () => useContext(ReservasDispatchContext);
