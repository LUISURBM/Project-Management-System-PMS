import React from "react";
import TransaccionesListItems from "./TransaccionesListItems";

const TransaccionesList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <TransaccionesListItems />
    </div>
  );
};

export default TransaccionesList;
