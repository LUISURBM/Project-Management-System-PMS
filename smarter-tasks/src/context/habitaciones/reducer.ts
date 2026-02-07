interface Habitacion {
  id: number;
  name: string;
}

// Define the initial state
export const initialState: HabitacionesState = {
  habitaciones: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export interface HabitacionesState {
  habitaciones: Habitacion[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type HabitacionesActions =
  | { type: "FETCH_HABITACIONES_REQUEST" }
  | { type: "FETCH_HABITACIONES_SUCCESS"; payload: Habitacion[] }
  | { type: "FETCH_HABITACIONES_FAILURE"; payload: string }
  | { type: "ADD_HABITACION_SUCCESS"; payload: Habitacion };

export const reducer = (
  state: HabitacionesState = initialState,
  action: HabitacionesActions
): HabitacionesState => {
  switch (action.type) {
    case "FETCH_HABITACIONES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_HABITACIONES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        habitaciones: action.payload,
      };
    case "FETCH_HABITACIONES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "ADD_HABITACION_SUCCESS":
      // Here I'll insert new new habitacion object, which is coming in this
      // `action.payload`, to the `habitaciones` array present in state.
      return { ...state, habitaciones: [...state.habitaciones, action.payload] };
    default:
      return state;
  }
};
