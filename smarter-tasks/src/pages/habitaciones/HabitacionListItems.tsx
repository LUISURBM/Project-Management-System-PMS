import { Link } from "react-router-dom";
import { useHabitacionesState } from "../../context/habitaciones/context";

export default function HabitacionListItems() {
  let state: any = useHabitacionesState();
  console.log(state);
  const { payload, isLoading, isError, errorMessage } = state;

  if (payload.items.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {payload.items.map((project: any) => (
        <Link
          key={project.id_habitacion}
          to={`${project.id_habitacion}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {project.numero} - {project.numero}
          </h5>
        </Link>
      ))}
    </>
  );
}
