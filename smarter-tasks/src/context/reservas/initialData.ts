import { ReservaData } from "./types";

const initialData: ReservaData = {
  columns: {
    Cancelado: {
      id: "Cancelado",
      title: "Cancelados",
      taskIDs: ["2"],
    },
    Activa: {
      id: "Activa",
      title: "Activas",
      taskIDs: ["1"],
    },
    Finalizado: {
      id: "Finalizado",
      title: "Finalizadas",
      taskIDs: [],
    },
  },
  tasks: {
    "1": {
      id: 1,
      id_huesped: "Sample Task",
      id_habitacion: "Sample description about the task which is to be completed",
      fecha_entrada: "2023-01-01",
      fecha_salida: "2023-01-02",
      estado_reserva: "Activa",
      total_pagado: 100.0,
    },
    "2": {
      id: 2,
      id_huesped: "Sample Task",
      id_habitacion: "Sample description about the task which is to be completed",
      fecha_entrada: "2023-01-01",
      fecha_salida: "2023-01-02",
      estado_reserva: "Cancelado",
      total_pagado: 100.0,
    },
    "3": {
      id: 3,
      id_huesped: "Sample Task",
      id_habitacion: "Sample description about the task which is to be completed",
      fecha_entrada: "2023-01-01",
      fecha_salida: "2023-01-02",
      estado_reserva: "Finalizado",
      total_pagado: 100.0,
    },
  },
  columnOrder: ["Cancelado", "Activa", "Finalizado"],
};

export default initialData;
