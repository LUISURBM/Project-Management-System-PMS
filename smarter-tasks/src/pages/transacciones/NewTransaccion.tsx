// src/pages/transacciones/NewTransaccion.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// First I'll import the addProject function
import { addProject } from "../../context/projects/actions";

// Then I'll import the useProjectsDispatch hook from projects context
import { useProjectsDispatch } from "../../context/projects/context";

type Inputs = {
  idCaja: number;
  tipoMovimiento: string;
  monto: number;
  descripcion: string;
  fechaMovimiento: string;
};

const NewTransaccion = () => {
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
    const { descripcion } = data;

    // Next, I'll call the addProject function with two arguments:
    //`dispatchProjects` and an object with `descripcion` attribute.
    // As it's an async function, we will await for the response.
    const response = await addProject(dispatchProjects, {
      name: descripcion || "Nueva Transacción",
    });

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
        + Nueva Transacción
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
                    Nueva Transacción
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Caja
                      </label>
                      <input
                        type="number"
                        {...register("idCaja", {
                          required: "La caja es requerida",
                          valueAsNumber: true,
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.idCaja && (
                        <span className="text-red-500 text-sm">
                          {errors.idCaja.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo de Movimiento
                      </label>
                      <select
                        {...register("tipoMovimiento", {
                          required: "El tipo de movimiento es requerido",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      >
                        <option value="">Seleccionar tipo...</option>
                        <option value="Ingreso">Ingreso</option>
                        <option value="Gasto">Gasto</option>
                      </select>
                      {errors.tipoMovimiento && (
                        <span className="text-red-500 text-sm">
                          {errors.tipoMovimiento.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Monto
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register("monto", {
                          required: "El monto es requerido",
                          valueAsNumber: true,
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.monto && (
                        <span className="text-red-500 text-sm">
                          {errors.monto.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Descripción
                      </label>
                      <textarea
                        {...register("descripcion")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        rows={3}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Fecha de Movimiento
                      </label>
                      <input
                        type="datetime-local"
                        {...register("fechaMovimiento")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
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
                        Crear Transacción
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

export default NewTransaccion;
