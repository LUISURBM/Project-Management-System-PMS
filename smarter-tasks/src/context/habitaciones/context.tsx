// src/context/projects/context.tsx

import React, { createContext, useContext, useReducer } from "react";
import {
  RoomsActions,
  HabitacionesState,
  initialState,
  reducer,
} from "./reducer";
const HabitacionesStateContext = createContext<HabitacionesState | undefined>(
  undefined
);

// Lets define a new type called HabitacionesDispatch using TypeScript.

type HabitacionesDispatch = React.Dispatch<RoomsActions>;

// Using createContext function, we will create a context
// called `HabitacionesDispatchContext`. Let's say the shape of this new
// context object is HabitacionesDispatch (which I'll define now, wait for it).
// I've set the default value to undefined.

const HabitacionesDispatchContext = createContext<HabitacionesDispatch | undefined>(
  undefined
);
export const HabitacionesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this HabitacionesDispatchContext.

  return (
    <HabitacionesStateContext.Provider value={state}>
      <HabitacionesDispatchContext.Provider value={dispatch}>
        {children}
      </HabitacionesDispatchContext.Provider>
    </HabitacionesStateContext.Provider>
  );
};

export const useHabitacionesState = () => useContext(HabitacionesStateContext);

// This line defines a custom hook `useHabitacionesState`, that uses the `useContext`
// hook to access the value stored in the `HabitacionesStateContext`.
// The `HabitacionesStateContext` is created using the createContext function
// and is used to store the current `state` of the projects.
// By using the `useHabitacionesState` hook in a component,
// you can retrieve the current `state` of the projects without directly accessing
// the context or passing down the state as a prop. This simplifies the code
// and ensures that the state is always up to date.

export const useHabitacionesDispatch = () => useContext(HabitacionesDispatchContext);

// This line defines a custom hook `useHabitacionesDispatch` that also uses the
//`useContext` hook to access the value stored in the `HabitacionesDispatchContext`.

// The `HabitacionesDispatchContext` is created using the createContext function and is
// used to store the `dispatch` function for updating the state of the projects.
// By using the `useHabitacionesDispatch` hook in a component, you can retrieve the
// `dispatch` function without directly accessing the context or passing it down
// as a prop. This allows you to dispatch actions to update the state of projects
//  from anywhere within your component tree that is wrapped with
// the`HabitacionesProvider`.

