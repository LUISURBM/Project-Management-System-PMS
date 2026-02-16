import { Link } from "react-router-dom";
import { useReservasState } from "../../context/reservas/context";

export default function ReservasListItems() {
  let state: any = useReservasState();
  const { projects, isLoading, isError, errorMessage } = state;
  console.log(projects);

  if (!projects) {
    return <span>Sin información.</span>;
  }

  if (projects.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {projects.map((project: any) => (
        <Link
          key={project.id}
          to={`${project.id}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {project.name}
          </h5>
        </Link>
      ))}
    </>
  );
}
