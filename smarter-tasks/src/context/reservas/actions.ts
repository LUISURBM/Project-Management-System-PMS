// Import required type annotations
import { API_ENDPOINT } from "../../config/constants";
import initialData from "./initialData";
import {
  ReservaData,
  ReservaDetails,
  ReservaDetailsPayload,
  ReservaListAvailableAction,
  ReservasDispatch,
} from "./types";

// The function will take a dispatch as first argument, which can be used to send an action to `reducer` and update the state accordingly
export const addBooking = async (
  dispatch: ReservasDispatch,
  booking: ReservaDetailsPayload
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ReservaListAvailableAction.CREATE_BOOKING_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }
    dispatch({ type: ReservaListAvailableAction.CREATE_BOOKING_SUCCESS });
    fetchHabitaciones(dispatch);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ReservaListAvailableAction.CREATE_BOOKING_FAILURE,
      payload: "Unable to create booking",
    });
  }
};
export const reorderReservas = (
  dispatch: ReservasDispatch,
  newState: ReservaData
) => {
  dispatch({ type: ReservaListAvailableAction.REORDER_BOOKINGS, payload: newState });
};

export const refreshReservas = async (
  dispatch: ReservasDispatch,
  roomID: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ReservaListAvailableAction.FETCH_BOOKINGS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/bookings/${roomID}/rooms`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    // extract the response body as JSON data
    const data = await response.json();
    console.dir(data);
    const formattedData = initialData;
    const cancelledIds: Array<string> = [];
    const activeIds: Array<string> = [];
    const completedIds: Array<string> = [];
    let tasks = {};
    data.forEach((booking: any, index: number) => {
      if (booking.estado_reserva === "Cancelada") {
        cancelledIds.push(`${booking.id}`);
      } else if (booking.estado_reserva === "Activa") {
        activeIds.push(`${booking.id}`);
      } else if (booking.estado_reserva === "Finalizada") {
        completedIds.push(`${booking.id}`);
      }
      tasks = { ...tasks, [`${booking.id}`]: booking };
    });
    formattedData.columns.Cancelado.taskIDs = cancelledIds;
    formattedData.columns.Activa.taskIDs = activeIds;
    formattedData.columns.Finalizado.taskIDs = completedIds;
    formattedData.tasks = tasks;
    console.log("Formatted Data:", formattedData);
    dispatch({
      type: ReservaListAvailableAction.FETCH_BOOKINGS_SUCCESS,
      payload: formattedData,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ReservaListAvailableAction.FETCH_BOOKINGS_FAILURE,
      payload: "Unable to load rooms",
    });
  }
};

export const deleteReserva = async (
  dispatch: ReservasDispatch,
  projectID: string,
  booking: ReservaDetails
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ReservaListAvailableAction.DELETE_BOOKINGS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/bookings/${booking.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }
    dispatch({ type: ReservaListAvailableAction.DELETE_BOOKINGS_SUCCESS });
    refreshReservas(dispatch, projectID);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ReservaListAvailableAction.DELETE_BOOKINGS_FAILURE,
      payload: "Unable to delete booking",
    });
  }
};

export const updateReserva = async (
  dispatch: ReservasDispatch,
  projectID: string,
  booking: ReservaDetails
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    // Display loading status
    dispatch({ type: ReservaListAvailableAction.UPDATE_BOOKING_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/bookings/${booking.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update booking");
    }
    // Display success and refresh the bookings
    dispatch({ type: ReservaListAvailableAction.UPDATE_BOOKING_SUCCESS });
    refreshReservas(dispatch, projectID);
  } catch (error) {
    console.error("Operation failed:", error);
    // Display error status
    dispatch({
      type: ReservaListAvailableAction.UPDATE_BOOKING_FAILURE,
      payload: "Unable to update booking",
    });
  }
};

export const fetchHabitaciones = async (
  dispatch: ReservasDispatch
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ReservaListAvailableAction.FETCH_BOOKINGS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/rooms/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: ReservaListAvailableAction.FETCH_BOOKINGS_SUCCESS,
      payload: data,
    });
    console.dir(data);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ReservaListAvailableAction.FETCH_BOOKINGS_FAILURE,
      payload: "Unable to load rooms",
    });
  }
};