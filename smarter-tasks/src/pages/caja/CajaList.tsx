import React from "react";
import CajaListItems from "./CajaListItems";

const CajaList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <CajaListItems />
    </div>
  );
};

export default CajaList;
