import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import NewTransaccion from "./NewTransaccion";
const TransaccionesList = React.lazy(() => import("./TransaccionesList"));

const Transacciones = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Transacciones
        </h2>
        <NewTransaccion />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <TransaccionesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Transacciones;
