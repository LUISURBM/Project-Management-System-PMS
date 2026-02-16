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
  const getStatusConfig = (id: number) => {
    switch (id) {
      case 1:
        return { label: 'Libre', color: '#10b981', shape: '✅' };
      case 2:
        return { label: 'Ocupada', color: '#3b82f6', shape: '👤' };
      case 3:
        return { label: 'Limpieza', color: '#f59e0b', shape: '🧼' };
      case 4:
        return { label: 'Mantenimiento', color: '#ef4444', shape: '🛠️' };
      default:
        return { label: 'Desconocido', color: '#9ca3af', shape: '❓' };
    }
  };

  // Inside your Component:
  return (
    <>
      {payload.items.map((project: any) => {
        const status = getStatusConfig(project.id_estado);
        return (<Link
          key={project.id_habitacion}
          to={`${project.id_habitacion}`}
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="status-container grid gap-2 grid-cols-2">
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              {project.numero}
            </h5>
            <span style={{ color: status.color, fontWeight: 'bold' }}>
              {status.label}
            </span>
          </div>
        </Link>)
      }
      )}
    </>
  );
}
