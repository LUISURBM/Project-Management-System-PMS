import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchMembers } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import { fetchProjects } from "../../context/projects/actions";
import { useProjectsDispatch } from "../../context/projects/context";
import { fetchHabitaciones } from "../../context/habitaciones/actions";
import { useHabitacionesDispatch } from "../../context/habitaciones/context";

const ReservasContainer = () => {
  const projectDispatch = useProjectsDispatch();
  const memberDispatch = useMembersDispatch();
  const habitacionesDispatch = useHabitacionesDispatch();
  useEffect(() => {
    fetchHabitaciones(habitacionesDispatch);
    fetchProjects(projectDispatch);
    fetchMembers(memberDispatch);
  }, [habitacionesDispatch, projectDispatch, memberDispatch]);
  return <Outlet />;
};

export default ReservasContainer;
