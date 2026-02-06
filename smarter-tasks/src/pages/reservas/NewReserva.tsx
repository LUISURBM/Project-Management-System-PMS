// src/pages/reservas/NewReserva.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// First I'll import the addProject function
import { addProject } from "../../context/projects/actions";

// Then I'll import the useProjectsDispatch hook from projects context
import { useProjectsDispatch } from "../../context/projects/context";
type Inputs = {
  name: string;
  checkIn: string;
  checkOut: string;
  guest: string;
  room: string;
  status: string;
  number: number;
  totalPagado: number;
  estadoReserva: string;
  notes: string;
};
const NewReserva = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Next, I'll add a new state to handle errors.
  const [error, setError] = useState(null);

  // Then I'll call the useProjectsDispatch function to get the dispatch function
  // for projects
  const dispatchProjects = useProjectsDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name } = data;

    // Next, I'll call the addProject function with two arguments:
    //`dispatchProjects` and an object with `name` attribute.
    // As it's an async function, we will await for the response.
    const response = await addProject(dispatchProjects, { name });

    // Then depending on response, I'll either close the modal...
    if (response.ok) {
      setIsOpen(false);
    } else {
      // Or I'll set the error.
      setError(response.error);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        + Nueva Reserva
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Nueva Reservación
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "El nombre es requerido",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-sm">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Check-in
                      </label>
                      <input
                        type="datetime-local"
                        {...register("checkIn", {
                          required: "La fecha de check-in es requerida",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.checkIn && (
                        <span className="text-red-500 text-sm">
                          {errors.checkIn.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Check-out
                      </label>
                      <input
                        type="datetime-local"
                        {...register("checkOut", {
                          required: "La fecha de check-out es requerida",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.checkOut && (
                        <span className="text-red-500 text-sm">
                          {errors.checkOut.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Habitación
                      </label>
                      <input
                        type="text"
                        {...register("room")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Número
                      </label>
                      <input
                        type="number"
                        {...register("number", {
                          valueAsNumber: true,
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Total Pagado
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("totalPagado", {
                          valueAsNumber: true,
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Estado de Reserva
                      </label>
                      <select
                        {...register("estadoReserva")}
                        defaultValue="Activa"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      >
                        <option value="Activa">Activa</option>
                        <option value="Finalizada">Finalizada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Notas
                      </label>
                      <textarea
                        {...register("notes")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        rows={3}
                      />
                    </div>

                    {error && (
                      <div className="mb-4 text-red-500 text-sm">{error}</div>
                    )}

                    <div className="mt-4 flex gap-2 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Crear Reserva
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewReserva;
