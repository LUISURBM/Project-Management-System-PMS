import { Link } from "react-router-dom";
import { useHabitacionesState } from "../../context/habitaciones/context";

export default function HabitacionListItems() {
  let state: any = useHabitacionesState();
  console.log(state);
  const { habitaciones, isLoading, isError, errorMessage } = state;

  if (habitaciones.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {habitaciones.map((project: any) => (
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
