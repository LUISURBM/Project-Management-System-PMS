import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchMembers } from "../../context/members/actions";
import { useMembersDispatch } from "../../context/members/context";
import { fetchProjects } from "../../context/projects/actions";
import { useProjectsDispatch } from "../../context/projects/context";

const HuespedContainer = () => {
  const projectDispatch = useProjectsDispatch();
  const memberDispatch = useMembersDispatch();
  useEffect(() => {
    fetchProjects(projectDispatch);
    fetchMembers(memberDispatch);
  }, [projectDispatch, memberDispatch]);
  return <Outlet />;
};

export default HuespedContainer;
