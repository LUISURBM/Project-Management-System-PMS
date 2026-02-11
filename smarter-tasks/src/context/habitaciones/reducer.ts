interface Habitacion {
  id_habitacion: number;
  numero: string;
  precio_base: string;
  id_estado: string;
  notas: string;
  tipo: string;
}

// Define the initial state
export const initialState: HabitacionesState = {
  payload: { items: [] },
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export interface HabitacionesState {
  payload: { items: Habitacion[] };
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type RoomsActions =
  | { type: "FETCH_HABITACIONES_REQUEST" }
  | { type: "FETCH_HABITACIONES_SUCCESS"; payload: { items: Habitacion[] } }
  | { type: "FETCH_HABITACIONES_FAILURE"; payload: string }
  | { type: "ADD_HABITACION_SUCCESS"; payload: Habitacion };

export const reducer = (
  state: HabitacionesState = initialState,
  action: RoomsActions
): HabitacionesState => {
  console.log('action', action);
  console.log('state', state);
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
        payload: { items: action.payload.items },
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
      return { ...state, payload: { items: [...state.payload.items, action.payload] } };
    default:
      return state;
  }
};
