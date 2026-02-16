import React from "react";
import HabitacionListItems from "./HabitacionListItems";

const HabitacionList: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6 mt-5">
      <HabitacionListItems />
    </div>
  );
};

export default HabitacionList;
