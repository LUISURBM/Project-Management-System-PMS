import { ReservaData } from "./types";

const initialData: ReservaData = {
  columns: {
    Cancelado: {
      id: "Cancelado",
      title: "Canceladas",
      taskIDs: [
        // "9", "2"
      ],
    },
    Activa: {
      id: "Activa",
      title: "Activas",
      taskIDs: [
        // "3", "4"
      ]
    },
    Finalizado: {
      id: "Finalizado",
      title: "Finalizadas",
      taskIDs: [
        // "5", "6"
      ],
    },
  },
  tasks: {
    // "9": { id: 9, id_huesped: "Guest 9", id_habitacion: "Room 109", fecha_entrada: "2023-01-09", fecha_salida: "2023-01-13", estado_reserva: "Cancelado", total_pagado: 145.0 },
    // "2": { id: 2, id_huesped: "Guest 20", id_habitacion: "Room 120", fecha_entrada: "2023-01-20", fecha_salida: "2023-01-24", estado_reserva: "Cancelado", total_pagado: 176.0 },
    // "3": { id: 3, id_huesped: "Guest 39", id_habitacion: "Room 219", fecha_entrada: "2023-02-19", fecha_salida: "2023-02-23", estado_reserva: "Activa", total_pagado: 142.0 },
    // "4": { id: 4, id_huesped: "Guest 40", id_habitacion: "Room 220", fecha_entrada: "2023-02-20", fecha_salida: "2023-02-24", estado_reserva: "Activa", total_pagado: 176.0 },
    // "5": { id: 5, id_huesped: "Guest 59", id_habitacion: "Room 319", fecha_entrada: "2023-03-19", fecha_salida: "2023-03-23", estado_reserva: "Finalizado", total_pagado: 142.0 },
    // "6": { id: 6, id_huesped: "Guest 60", id_habitacion: "Room 320", fecha_entrada: "2023-03-20", fecha_salida: "2023-03-24", estado_reserva: "Finalizado", total_pagado: 176.0 },
  },
  columnOrder: ["Cancelado", "Activa", "Finalizado"],
};

export default initialData;
