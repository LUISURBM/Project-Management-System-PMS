import { API_ENDPOINT } from "../../config/constants";

export const fetchHabitaciones = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    console.log("Fetching habitaciones with token:", token);
    dispatch({ type: "FETCH_HABITACIONES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_HABITACIONES_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching habitaciones:", error);
    dispatch({
      type: "FETCH_HABITACIONES_FAILURE",
      payload: "Unable to load habitaciones",
    });
  }
};