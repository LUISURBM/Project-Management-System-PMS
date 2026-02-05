import React from "react";
import HabitacionListItems from "./HabitacionListItems";

const HabitacionList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <HabitacionListItems />
    </div>
  );
};

export default HabitacionList;
