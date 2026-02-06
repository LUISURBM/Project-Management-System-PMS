import React from "react";
import ReservasListItems from "./ReservasListItems";

const ReservasList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <ReservasListItems />
    </div>
  );
};

export default ReservasList;
