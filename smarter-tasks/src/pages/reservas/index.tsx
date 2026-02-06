import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import NewReserva from "./NewReserva";
const ReservasList = React.lazy(() => import("./ReservasList"));

const Reservas = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Reservaciones
        </h2>
        <NewReserva />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ReservasList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Reservas;
