import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useTasksDispatch, useTasksState } from "../../context/reservas/context";

import { useHabitacionesState } from "../../context/habitaciones/context";
import { refreshTasks } from "../../context/reservas/actions";
import DragDropList from "./DragDropList";

const RoomDetails = () => {
  const tasksState = useTasksState();
  const taskDispatch = useTasksDispatch();
  const habitacionState = useHabitacionesState();
  let { roomID } = useParams();
  useEffect(() => {
    if (roomID) refreshTasks(taskDispatch, roomID);
  }, [roomID, taskDispatch]);
  console.log('habitacionState', habitacionState);
  const selectedProject = habitacionState?.payload.items.filter(
    (project) => `${project.id_habitacion}` === roomID
  )?.[0];

  if (!selectedProject) {
    return <>Habitación no existe!</>;
  }

  if (tasksState.isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          {selectedProject.numero}
        </h2>
        <p>{selectedProject.tipo}</p>
        <p>{selectedProject.precio_base}COP$</p>
        <p>{selectedProject.id_estado}</p>
      </div>
      <div className="pt-4 grid grid-cols-1 gap-2">
        Notas:
        <p>{selectedProject.notas}</p>
      </div>
      <div className="flex justify-end">
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Editar
          </button>
        </Link>
        <Link to={`tasks/new`}>
          <button
            id="newTaskBtn"
            className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Nueva Reserva
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <DragDropList data={tasksState.projectData} />
      </div>
    </>
  );
};

export default RoomDetails;
