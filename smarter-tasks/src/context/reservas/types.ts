export enum TaskListAvailableAction {
  FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE",

  DELETE_TASKS_REQUEST = "DELETE_TASKS_REQUEST",
  DELETE_TASKS_SUCCESS = "DELETE_TASKS_SUCCESS",
  DELETE_TASKS_FAILURE = "DELETE_TASKS_FAILURE",

  CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST",
  CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS",
  CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE",

  // Add action types
  UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST",
  UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS",
  UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE",

  REORDER_TASKS = "REORDER_TASKS",
}

export type TaskActions =
  | { type: TaskListAvailableAction.REORDER_TASKS; payload: ReservaData }
  | { type: TaskListAvailableAction.FETCH_TASKS_REQUEST }
  | { type: TaskListAvailableAction.FETCH_TASKS_SUCCESS; payload: ReservaData }
  | { type: TaskListAvailableAction.FETCH_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.DELETE_TASKS_REQUEST }
  | { type: TaskListAvailableAction.DELETE_TASKS_SUCCESS }
  | { type: TaskListAvailableAction.DELETE_TASKS_FAILURE; payload: string }
  | { type: TaskListAvailableAction.CREATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.CREATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.CREATE_TASK_FAILURE; payload: string }
  | { type: TaskListAvailableAction.UPDATE_TASK_REQUEST }
  | { type: TaskListAvailableAction.UPDATE_TASK_SUCCESS }
  | { type: TaskListAvailableAction.UPDATE_TASK_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type TasksDispatch = React.Dispatch<TaskActions>;

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

export type TaskDetailsPayload = Omit<ReservaDetails, "id" | "assignee" | "state">;

export type Tasks = {
  [k: string]: ReservaDetails;
};

export type ReservaData = {
  tasks: Tasks;
  columns: Columns;
  columnOrder: AvailableColumns[];
};

export interface ReservaListState {
  projectData: ReservaData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
