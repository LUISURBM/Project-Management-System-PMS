// src/pages/reservas/NewReserva.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

// First I'll import the addBooking function
import { addBooking } from "../../context/reservas/actions";

// Then I'll import the useReservasDispatch hook from projects context
import { useHabitacionesState } from "../../context/habitaciones/context";
import { useReservasDispatch, useReservasState } from "../../context/reservas/context";
import { ReservaDetailsPayload } from "../../context/reservas/types";
import { Habitacion } from "../../context/habitaciones/reducer";

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
  id_huesped: string;
  id_habitacion: string;
  fecha_entrada: string;
  fecha_salida: string;
  estado_reserva: string;
};
// RoomSelect is a standalone component so it doesn't remount with the modal
const RoomSelect = ({ onSelect, payload, selectedId }: any) => {
  const [term, setTerm] = useState('');
  const [rooms, setRooms] = useState([] as any[]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(-1);
  const [openSuggestions, setOpenSuggestions] = useState(false);

  useEffect(() => {
    // If parent provides selectedId, show its label; clear when absent
    if (selectedId && payload?.items) {
      const found = payload.items.find((r: Habitacion) => String(r.id_habitacion) === String(selectedId));
      if (found) setTerm(`Habitación ${found.numero} - ${found.tipo}`);
      else setTerm('');
    } else {
      setTerm('');
    }
  }, [selectedId, payload]);

  useEffect(() => {
    if (term.length < 1) {
      setRooms([]);
      return;
    }

    const loadRooms = async () => {
      const items = payload?.items ?? [];
      const filtered = items.filter((r: any) =>
        r.numero.toString().includes(term) ||
        r.tipo.toLowerCase().includes(term.toLowerCase())
      );
      setRooms(filtered);
    };

    const timer = setTimeout(loadRooms, 300);
    return () => clearTimeout(timer);
  }, [term, payload]);

  const handleSelect = (room?: Habitacion) => {
    if (room) {
      const label = `Habitación ${room.numero} - ${room.tipo}`;
      setTerm(label);
      onSelect(room);
    } else {
      setTerm('');
      onSelect(null);
    }
    setOpenSuggestions(false);
    setRooms([]);
    setCursor(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setCursor(prev => (prev < rooms.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setCursor(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (cursor >= 0 && rooms[cursor]) {
        e.preventDefault();
        handleSelect(rooms[cursor]);
      } else if (e.key === 'Tab' && term !== "") {
        const exactMatch = (payload?.items ?? []).find((r: Habitacion) => `Habitación ${r.numero} - ${r.tipo}` === term);
        if (!exactMatch) handleSelect(undefined);
      }
    } else if (e.key === 'Escape') {
      setOpenSuggestions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!term.includes('Habitación')) {
        handleSelect(undefined);
      }
    }, 200);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border text-sm"
        placeholder="Escribe número o tipo (ej: 101)..."
        value={term}
        onChange={(e) => { setTerm(e.target.value); setOpenSuggestions(true); }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        autoComplete="off"
      />

      {openSuggestions && rooms.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
          {rooms.map((room: Habitacion, i: number) => (
            <div
              key={room.id_habitacion}
              onMouseDown={() => handleSelect(room)}
              className={`flex justify-between items-center px-4 py-2 cursor-pointer text-sm ${cursor === i ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'} `}
            >
              <div>
                <span className="font-bold">Hab {room.numero}</span>
                <span className="ml-2 opacity-80 text-xs italic">({room.tipo})</span>
              </div>
              <div className={`text-xs font-semibold ${cursor === i ? 'text-blue-100' : 'text-blue-600'}`}>
                ${room.precio_base}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// GuestSelect uses reservas data to autocomplete guest names (id_huesped)
const GuestSelect = ({ onSelect, payload, selectedId }: any) => {
  const [term, setTerm] = useState('');
  const [guests, setGuests] = useState([] as string[]);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    // Build unique guest list from reservas payload.tasks
    const itemsObj = payload?.tasks ?? {};
    const items = Object.values(itemsObj) as any[];
    const unique = Array.from(new Set(items.map((t) => t.id_huesped)));
    setGuests(unique);
  }, [payload]);

  useEffect(() => {
    if (selectedId && guests.length > 0) {
      const found = guests.find(g => String(g) === String(selectedId));
      if (found) setTerm(String(found));
      else setTerm('');
    } else {
      setTerm('');
    }
  }, [selectedId, guests]);

  const filtered = term.length > 0 ? guests.filter(g => g.toLowerCase().includes(term.toLowerCase())) : [];

  const handleSelect = (guest?: string) => {
    if (guest) {
      setTerm(guest);
      onSelect(guest);
    } else {
      setTerm('');
      onSelect(null);
    }
    setOpenSuggestions(false);
    setCursor(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') setCursor(prev => (prev < filtered.length - 1 ? prev + 1 : prev));
    else if (e.key === 'ArrowUp') setCursor(prev => (prev > 0 ? prev - 1 : prev));
    else if ((e.key === 'Enter' || e.key === 'Tab') && cursor >= 0 && filtered[cursor]) {
      e.preventDefault();
      handleSelect(filtered[cursor]);
    } else if (e.key === 'Escape') setOpenSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={term}
        onChange={(e) => { setTerm(e.target.value); setOpenSuggestions(true); setCursor(-1); }}
        onKeyDown={handleKeyDown}
        onBlur={() => setTimeout(() => setOpenSuggestions(false), 150)}
        placeholder="Buscar huésped..."
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
      />
      {openSuggestions && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
          {filtered.map((g, i) => (
            <div
              key={g}
              onMouseDown={() => handleSelect(g)}
              className={`px-4 py-2 cursor-pointer text-sm ${cursor === i ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}>
              {g}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NewReserva = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const dispatchProjects = useReservasDispatch();
  const {
    register,
    handleSubmit,
    setValue, watch,
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
    console.log("Submitting new booking:", name);
    await addBooking(dispatchProjects, data as ReservaDetailsPayload);
  };
  const selectedRoomId = watch("id_habitacion");
  console.log('Selected room ID:', selectedRoomId);
  const selectedGuestId = watch("id_huesped");

  useEffect(() => {
    console.log('Habitación cambiada:', selectedRoomId);
  }, [selectedRoomId]);

  let suggestions: any = useHabitacionesState();
  const { payload, isLoading, isError, errorMessage } = suggestions;
  console.log('suggestions', suggestions);

  const reservasState: any = useReservasState();
  const reservasPayload = reservasState?.projectData;




  const handleRoomSelect = (room: any) => {
    // 'room' trae: { id_habitacion, numero, precio_base, tipo, etc. }
    console.log('Selected room:', room);
    if (room && room.id_habitacion) {
      setValue("id_habitacion", room.id_habitacion, { shouldValidate: true });
      try {
        const fechaEntrada = watch("fecha_entrada");
        const fechaSalida = watch("fecha_salida");
        let total = Number(room.precio_base) || 0;
        if (fechaEntrada && fechaSalida) {
          const d1 = new Date(fechaEntrada);
          const d2 = new Date(fechaSalida);
          const msPerDay = 1000 * 60 * 60 * 24;
          const diff = (d2.getTime() - d1.getTime()) / msPerDay;
          const days = Math.max(1, Math.ceil(diff));
          total = (Number(room.precio_base) || 0) * days;
          // optionally set number of days
          setValue("number", days, { shouldValidate: true });
        }
        setValue("totalPagado", total, { shouldValidate: true });
      } catch (e) {
        console.warn('Error calculating totalPagado', e);
      }
    } else {
      setValue("id_habitacion", '', { shouldValidate: true });
    }
  };

  // Recalculate totalPagado and number (days) whenever entrada/salida or selected room changes
  const fechaEntrada = watch("fecha_entrada");
  const fechaSalida = watch("fecha_salida");
  useEffect(() => {
    try {
      const roomId = selectedRoomId;
      const items = payload?.items ?? [];
      const room = items.find((r: any) => String(r.id_habitacion) === String(roomId));
      if (!room) {
        setValue("totalPagado", 0, { shouldValidate: true });
        setValue("number", 0, { shouldValidate: true });
        return;
      }

      const precio = Number(room.precio_base) || 0;
      let days = 1;
      if (fechaEntrada && fechaSalida) {
        const d1 = new Date(fechaEntrada);
        const d2 = new Date(fechaSalida);
        const msPerDay = 1000 * 60 * 60 * 24;
        const diff = (d2.getTime() - d1.getTime()) / msPerDay;
        days = Math.max(1, Math.ceil(diff));
      }

      const total = precio * days;
      setValue("totalPagado", total, { shouldValidate: true });
      setValue("number", days, { shouldValidate: true });
    } catch (e) {
      console.warn('Error recalculating totalPagado', e);
    }
  }, [fechaEntrada, fechaSalida, selectedRoomId, payload]);

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Nueva Reservación
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
                        Fecha de Entrada
                      </label>
                      <input
                        type="datetime-local"
                        {...register("fecha_entrada", {
                          required: "La fecha de entrada es requerida",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.fecha_entrada && (
                        <span className="text-red-500 text-sm">
                          {errors.fecha_entrada.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Fecha de Salida
                      </label>
                      <input
                        type="datetime-local"
                        {...register("fecha_salida", {
                          required: "La fecha de salida es requerida",
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      />
                      {errors.fecha_salida && (
                        <span className="text-red-500 text-sm">
                          {errors.fecha_salida.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        ID Habitación
                      </label>
                      <RoomSelect onSelect={handleRoomSelect} payload={payload} selectedId={selectedRoomId} />
                      <input
                        type="hidden"
                        {...register("id_habitacion", { required: "Debes seleccionar una habitación" })}
                      />
                      {errors.id_habitacion && (
                        <span className="text-red-500 text-sm">
                          {errors.id_habitacion.message}
                        </span>
                      )}
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
                        Huésped
                      </label>
                      <GuestSelect onSelect={(g: any) => {
                        if (g) setValue("id_huesped", g, { shouldValidate: true });
                        else setValue("id_huesped", '', { shouldValidate: true });
                      }} payload={reservasPayload} selectedId={selectedGuestId} />
                      <input type="hidden" {...register("id_huesped", { required: "ID del huésped es requerido" })} />
                      {errors.id_huesped && (
                        <span className="text-red-500 text-sm">
                          {errors.id_huesped.message}
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Estado de Reserva
                      </label>
                      <select
                        {...register("estado_reserva", {
                          required: "El estado de reserva es requerido",
                        })}
                        defaultValue="Activa"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                      >
                        <option value="Activa">Activa</option>
                        <option value="Finalizada">Finalizada</option>
                        <option value="Cancelada">Cancelada</option>
                      </select>
                      {errors.estado_reserva && (
                        <span className="text-red-500 text-sm">
                          {errors.estado_reserva.message}
                        </span>
                      )}
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
