import { Reducer } from "react";
import { ReservaActions, ReservaListAvailableAction, ReservaListState } from "./types";
// Define the initial state
import projectData from "./initialData";
export const initialState: ReservaListState = {
  projectData: projectData,
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const taskReducer: Reducer<ReservaListState, ReservaActions> = (
  state = initialState,
  action
) => {
  console.log("Reducer received action:", action);
  switch (action.type) {
    case ReservaListAvailableAction.FETCH_BOOKINGS_REQUEST:
      return { ...state, isLoading: true };
    case ReservaListAvailableAction.FETCH_BOOKINGS_SUCCESS:
      console.log("FETCH_BOOKINGS_SUCCESS", action.payload);
      return { ...state, isLoading: false, projectData: action.payload };
    case ReservaListAvailableAction.FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case ReservaListAvailableAction.DELETE_BOOKINGS_REQUEST:
      return { ...state, isLoading: true };
    case ReservaListAvailableAction.DELETE_BOOKINGS_SUCCESS:
      return { ...state, isLoading: false };
    case ReservaListAvailableAction.DELETE_BOOKINGS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case ReservaListAvailableAction.CREATE_BOOKING_REQUEST:
      return { ...state, isLoading: true };
    case ReservaListAvailableAction.CREATE_BOOKING_SUCCESS:
      return { ...state, isLoading: false };
    case ReservaListAvailableAction.CREATE_BOOKING_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    // Toggle the loading state based on action
    case ReservaListAvailableAction.UPDATE_BOOKING_REQUEST:
      return { ...state, isLoading: true };
    case ReservaListAvailableAction.UPDATE_BOOKING_SUCCESS:
      return { ...state, isLoading: false };
    case ReservaListAvailableAction.UPDATE_BOOKING_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case ReservaListAvailableAction.REORDER_BOOKINGS:
      return { ...state, isLoading: false, projectData: action.payload };
    default:
      return state;
  }
};
