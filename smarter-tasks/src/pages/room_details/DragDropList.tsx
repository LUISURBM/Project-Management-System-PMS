import React from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { reorderReservas, updateReserva } from "../../context/reservas/actions";
import { useReservasDispatch } from "../../context/reservas/context";
import { AvailableColumns, ReservaData } from "../../context/reservas/types";
import Column from "./Column";
const Container = (props: React.PropsWithChildren) => {
  return <div className="flex">{props.children}</div>;
};

const DragDropList = (props: { data: ReservaData }) => {
  const taskDispatch = useReservasDispatch();
  const { roomID } = useParams();
  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startKey = source.droppableId as AvailableColumns;
    const finishKey = destination.droppableId as AvailableColumns;

    const start = props.data.columns[startKey];
    const finish = props.data.columns[finishKey];

    if (start === finish) {
      const newReservaIDs = Array.from(start.taskIDs);
      newReservaIDs.splice(source.index, 1);
      newReservaIDs.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIDs: newReservaIDs,
      };
      const newState = {
        ...props.data,
        columns: {
          ...props.data.columns,
          [newColumn.id]: newColumn,
        },
      };
      reorderReservas(taskDispatch, newState);
      return;
    }
    // start and finish list are different

    const startReservaIDs = Array.from(start.taskIDs);
    // Remove the item from `startReservaIDs`
    const updatedItems = startReservaIDs.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIDs: startReservaIDs,
    };

    const finishReservaIDs = Array.from(finish.taskIDs);

    // Insert the item to destination list.
    finishReservaIDs.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIDs: finishReservaIDs,
    };

    // Create new state with newStart and newFinish
    const newState = {
      ...props.data,
      columns: {
        ...props.data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    reorderReservas(taskDispatch, newState);
    const updatedReserva = props.data.tasks[updatedItems[0]];
    updatedReserva.estado_reserva = finishKey;
    updateReserva(taskDispatch, roomID ?? "", updatedReserva);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {props.data.columnOrder.map((colID) => {
          const column = props.data.columns[colID];
          const tasks = column.taskIDs.map(
            (taskID) => props.data.tasks[taskID]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
};

export default DragDropList;
