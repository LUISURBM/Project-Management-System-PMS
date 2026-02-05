import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import NewHabitacion from "./NewHabitacion";
const HabitacionList = React.lazy(() => import("./HabitacionList"));

const Habitacion = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Habitaciones
        </h2>
        <NewHabitacion />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <HabitacionList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Habitacion;
