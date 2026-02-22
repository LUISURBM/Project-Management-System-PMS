import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useReservasDispatch, useReservasState } from "../../context/reservas/context";

import { useHabitacionesState } from "../../context/habitaciones/context";
import { refreshReservas } from "../../context/reservas/actions";
import DragDropList from "./DragDropList";
import NewReserva from "../reservas/NewReserva";

const RoomDetails = () => {
  const tasksState = useReservasState();
  const taskDispatch = useReservasDispatch();
  const habitacionState = useHabitacionesState();
  let { roomID } = useParams();
  useEffect(() => {
    if (roomID) refreshReservas(taskDispatch, roomID);
  }, [roomID, taskDispatch]);
  console.log('habitacionState', habitacionState);
  const selectedProject = habitacionState?.payload.items.filter(
    (project) => `${project.id_habitacion}` === roomID
  )?.[0];

  if (!selectedProject) {
    return <>Habitación no existe!</>;
  }

  console.log('tasksState', tasksState);
  if (tasksState.isLoading) {
    return <>Loading...</>;
  }
  const getStatusConfig = (id: string) => {
    switch (+id) {
      case 1:
        return { label: 'Libre', color: '#10b981', shape: '✅' };
      case 2:
        return { label: 'Ocupada', color: '#3b82f6', shape: '👤' };
      case 3:
        return { label: 'Limpieza', color: '#f59e0b', shape: '🧼' };
      case 4:
        return { label: 'Mantenimiento', color: '#ef4444', shape: '🛠️' };
      default:
        return { label: 'Desconocido', color: '#9ca3af', shape: '❓' };
    }
  };

  // Inside your Component:
  const status = getStatusConfig(selectedProject.id_estado);

  return (
    <>
      <div className="p-2 flex justify-start items-center gap-4">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Habitación {selectedProject.numero}
        </h2>
        <div className="status-container">
          <span style={{ color: status.color, fontWeight: 'bold' }}>
            {status.shape}{status.label}
          </span>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        Tipo: <p>{selectedProject.tipo}</p>
        Precio base: <p>{selectedProject.precio_base}COP$</p>
      </div>
      <div className="p-4 grid grid-cols-1 gap-2">
        Notas:
        <p>{selectedProject.notas_extras}</p>
      </div>
      <div className="flex justify-end flex-wrap gap-2 p-4">
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            ✏️ Editar
          </button>
        </Link>
        <NewReserva ></NewReserva>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <DragDropList data={tasksState.projectData} />
      </div>
    </>
  );
};

export default RoomDetails;
