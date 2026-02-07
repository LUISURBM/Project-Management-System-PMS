import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchMembers } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import { fetchHabitaciones } from "../../context/habitaciones/actions";
import { useHabitacionesDispatch } from "../../context/habitaciones/context";

const HabitacionContainer = () => {
  const projectDispatch = useHabitacionesDispatch();
  const memberDispatch = useMembersDispatch();
  useEffect(() => {
    fetchHabitaciones(projectDispatch);
    fetchMembers(memberDispatch);
  }, [projectDispatch, memberDispatch]);
  return <Outlet />;
};

export default HabitacionContainer;
