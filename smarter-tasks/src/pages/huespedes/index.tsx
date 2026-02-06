import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import NewHuesped from "./NewHuesped";
const HuespedList = React.lazy(() => import("./HuespedList"));

const Huesped = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          Huéspedes
        </h2>
        <NewHuesped />
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <HuespedList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Huesped;
