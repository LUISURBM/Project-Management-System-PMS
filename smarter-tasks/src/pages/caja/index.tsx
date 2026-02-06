import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import NewCaja from "./NewCaja";
const CajaList = React.lazy(() => import("./CajaList"));

const Caja = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Caja
        </h2>
        <NewCaja />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <CajaList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Caja;
