export enum ReservaListAvailableAction {
  FETCH_BOOKINGS_REQUEST = "FETCH_BOOKINGS_REQUEST",
  FETCH_BOOKINGS_SUCCESS = "FETCH_BOOKINGS_SUCCESS",
  FETCH_BOOKINGS_FAILURE = "FETCH_BOOKINGS_FAILURE",

  DELETE_BOOKINGS_REQUEST = "DELETE_BOOKINGS_REQUEST",
  DELETE_BOOKINGS_SUCCESS = "DELETE_BOOKINGS_SUCCESS",
  DELETE_BOOKINGS_FAILURE = "DELETE_BOOKINGS_FAILURE",

  CREATE_BOOKING_REQUEST = "CREATE_BOOKING_REQUEST",
  CREATE_BOOKING_SUCCESS = "CREATE_BOOKING_SUCCESS",
  CREATE_BOOKING_FAILURE = "CREATE_BOOKING_FAILURE",

  // Add action types
  UPDATE_BOOKING_REQUEST = "UPDATE_BOOKING_REQUEST",
  UPDATE_BOOKING_SUCCESS = "UPDATE_BOOKING_SUCCESS",
  UPDATE_BOOKING_FAILURE = "UPDATE_BOOKING_FAILURE",

  REORDER_BOOKINGS = "REORDER_BOOKINGS",
}

export type ReservaActions =
  | { type: ReservaListAvailableAction.REORDER_BOOKINGS; payload: ReservaData }
  | { type: ReservaListAvailableAction.FETCH_BOOKINGS_REQUEST }
  | { type: ReservaListAvailableAction.FETCH_BOOKINGS_SUCCESS; payload: ReservaData }
  | { type: ReservaListAvailableAction.FETCH_BOOKINGS_FAILURE; payload: string }
  | { type: ReservaListAvailableAction.DELETE_BOOKINGS_REQUEST }
  | { type: ReservaListAvailableAction.DELETE_BOOKINGS_SUCCESS }
  | { type: ReservaListAvailableAction.DELETE_BOOKINGS_FAILURE; payload: string }
  | { type: ReservaListAvailableAction.CREATE_BOOKING_REQUEST }
  | { type: ReservaListAvailableAction.CREATE_BOOKING_SUCCESS }
  | { type: ReservaListAvailableAction.CREATE_BOOKING_FAILURE; payload: string }
  | { type: ReservaListAvailableAction.UPDATE_BOOKING_REQUEST }
  | { type: ReservaListAvailableAction.UPDATE_BOOKING_SUCCESS }
  | { type: ReservaListAvailableAction.UPDATE_BOOKING_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type ReservasDispatch = React.Dispatch<ReservaActions>;

export type AvailableColumns = "Cancelado" | "Activa" | "Finalizado";

export type ColumnData = {
  id: string;
  title: string;
  taskIDs: string[];
};

export type Columns = {
  [k in AvailableColumns]: ColumnData;
};

export type ReservaDetails = {
  id: number;
  id_huesped: string;
  id_habitacion: string;
  fecha_entrada: string;
  fecha_salida: string;
  estado_reserva: AvailableColumns;
  total_pagado?: number;
};

export type ReservaDetailsPayload = Omit<ReservaDetails, "id" | "assignee" | "state">;

export type Reservas = {
  [k: string]: ReservaDetails;
};

export type ReservaData = {
  tasks: Reservas;
  columns: Columns;
  columnOrder: AvailableColumns[];
};

export interface ReservaListState {
  projectData: ReservaData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
