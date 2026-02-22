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
import { API_ENDPOINT } from "../../config/constants";

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
  notas: string;
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
    const items = payload?.items ?? [];
    if (term.length < 1) {
      // When the input is empty show a short list of available rooms
      setRooms(items.slice(0, 50));
      return;
    }

    const loadRooms = async () => {
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
        onFocus={() => {
          setOpenSuggestions(true);
          // If empty, load a short list from payload
          if (term.length < 1) {
            const items = payload?.items ?? [];
            setRooms(items.slice(0, 50));
          }
          setCursor(-1);
        }}
        onClick={() => {
          if (!openSuggestions) {
            setOpenSuggestions(true);
            if (term.length < 1) {
              const items = payload?.items ?? [];
              setRooms(items.slice(0, 50));
            }
            setCursor(-1);
          }
        }}
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

// GuestSelect queries the backend `/api/huespedes/search` for autocomplete
const GuestSelect = ({ onSelect, payload, selectedId }: any) => {
  const [term, setTerm] = useState('');
  const [options, setOptions] = useState<Array<{ value: any; label: string }>>([]);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ value: any; label: string } | null>(null);

  // Ensure the input shows the selected option label and isn't overwritten
  useEffect(() => {
    if (selectedOption && term !== selectedOption.label) {
      setTerm(selectedOption.label);
    }
  }, [selectedOption]);

  useEffect(() => {
    if (!selectedId) {
      setTerm('');
      return;
    }

    const items = payload?.items ?? [];
    const found = items.find((r: any) =>
      String(r.id_huesped) === String(selectedId) ||
      String(r.documento_identidad) === String(selectedId) ||
      ((r.nombre_completo ?? '') + ' ' + (r.documento_identidad ?? '')) === String(selectedId)
    );

    if (found) {
      const label = (found.nombre_completo ?? '') + ' ' + (found.documento_identidad ?? '');
      const opt = { value: found.id_huesped ?? found.documento_identidad ?? found.nombre_completo, label: label.trim() };
      setSelectedOption(opt);
      setTerm(opt.label);
      setOpenSuggestions(false);
      return;
    }

    // If not in payload, try to fetch via search endpoint (fallback)
    let active = true;
    const tryFetch = async () => {
      try {
        const res = await fetch(`${API_ENDPOINT}/huespedes/search?term=${encodeURIComponent(String(selectedId))}`);
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          const row = Array.isArray(data) && data.length > 0 ? data[0] : null;
          if (row) {
            const label = (row.nombre_completo ?? '') + ' ' + (row.documento_identidad ?? '');
            const opt = { value: row.id_huesped ?? row.documento_identidad ?? row.nombre_completo, label: label.trim() };
            setSelectedOption(opt);
            setTerm(opt.label);
            setOpenSuggestions(false);
            return;
          }
        }
      } catch (e) {
        // ignore
      }
      if (active) {
        setSelectedOption(null);
        setTerm(String(selectedId));
      }
    };
    tryFetch();
    return () => { active = false; };
  }, [selectedId, payload]);

  useEffect(() => {
    const items = payload?.items ?? [];
    if (!term || term.length < 1) {
      // show a short list of recent/available guests when input is empty
      const mapped = (items.slice(0, 50)).map((r: any) => ({
        value: r.id_huesped ?? r.documento_identidad ?? r.nombre_completo,
        label: r.nombre_completo! + ' ' + r.documento_identidad!,
      }));
      setOptions(mapped);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_ENDPOINT}/huespedes/search?term=${encodeURIComponent(term)}`);
        if (!active) return;
        if (res.ok) {
          const data = await res.json();
          // map rows to {value,label}
          const mapped = (Array.isArray(data) ? data : []).map((r: any) => ({
            value: r.id_huesped ?? r.documento_identidad ?? r.nombre_completo,
            label: r.nombre_completo! + ' ' + r.documento_identidad!,
          }));
          setOptions(mapped);
        } else {
          setOptions([]);
        }
      } catch (e) {
        setOptions([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);

    return () => { active = false; clearTimeout(timer); };
  }, [term]);

  const handleSelect = (opt?: { value: any; label: string }) => {
    console.log('Selected guest option:', opt);
    if (opt) {
      setSelectedOption(opt);
      setTerm(opt.label);
      onSelect(opt.value);
    } else {
      setSelectedOption(null);
      setTerm('');
      onSelect(null);
    }
    setOpenSuggestions(false);
    setCursor(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') setCursor(prev => (prev < options.length - 1 ? prev + 1 : prev));
    else if (e.key === 'ArrowUp') setCursor(prev => (prev > 0 ? prev - 1 : prev));
    else if ((e.key === 'Enter' || e.key === 'Tab') && cursor >= 0 && options[cursor]) {
      e.preventDefault();
      handleSelect(options[cursor]);
    } else if (e.key === 'Escape') setOpenSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={term}
          onChange={(e) => { setTerm(e.target.value); setOpenSuggestions(true); setCursor(-1); setSelectedOption(null); }}
          onFocus={() => {
            setOpenSuggestions(true);
            if (term.length < 1) {
              const items = payload?.items ?? [];
              const mapped = (items.slice(0, 50)).map((r: any) => ({
                value: r.id_huesped ?? r.documento_identidad ?? r.nombre_completo,
                label: r.nombre_completo! + ' ' + r.documento_identidad!,
              }));
              setOptions(mapped);
            }
            setCursor(-1);
          }}
          onClick={() => {
            setOpenSuggestions(true);
            if (term.length < 1) {
              const items = payload?.items ?? [];
              const mapped = (items.slice(0, 50)).map((r: any) => ({
                value: r.id_huesped ?? r.documento_identidad ?? r.nombre_completo,
                label: r.nombre_completo! + ' ' + r.documento_identidad!,
              }));
              setOptions(mapped);
            }
            setCursor(-1);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setOpenSuggestions(false), 150)}
          placeholder="Buscar huésped..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border pr-10"
        />

        {term && (
          <button
            type="button"
            aria-label="Limpiar"
            onClick={() => { setSelectedOption(null); setTerm(''); setOptions([]); setOpenSuggestions(true); onSelect(null); setCursor(-1); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
      {openSuggestions && (loading ? (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl px-4 py-2">Buscando...</div>
      ) : options.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl max-h-60 overflow-y-auto">
          {options.map((opt, i) => (
            <div
              key={String(opt.value) + i}
              onMouseDown={() => handleSelect(opt)}
              className={`px-4 py-2 cursor-pointer text-sm ${cursor === i ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-gray-700'}`}>
              {opt.label}
            </div>
          ))}
        </div>
      ))}
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
    reset,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<Inputs>();

  // Helper to compute totalPagado and number of days based on current form values
  const computeTotal = () => {
    try {
      const values = getValues();
      const entradaVal = values.fecha_entrada;
      const salidaVal = values.fecha_salida;
      const roomId = values.id_habitacion;
      const items = payload?.items ?? [];
      const room = items.find((r: any) => String(r.id_habitacion) === String(roomId));
      const precio = Number(room?.precio_base) || 0;

      let days = 0;
      if (entradaVal && salidaVal) {
        const d1 = new Date(entradaVal);
        const d2 = new Date(salidaVal);
        const msPerDay = 1000 * 60 * 60 * 24;
        const diff = (d2.getTime() - d1.getTime()) / msPerDay;
        days = Math.max(1, Math.ceil(diff));
      }

      const total = precio * (days || 0);
      setValue("totalPagado", total, { shouldValidate: true });
      setValue("number", days, { shouldValidate: true });
    } catch (e) {
      console.warn('computeTotal error', e);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name } = data;
      console.log("Submitting new booking:", name);
      await addBooking(dispatchProjects, data as ReservaDetailsPayload);
      // Clear form, close modal and refresh the page to show updates
      reset();
      closeModal();
      // Small delay to let modal close smoothly
      setTimeout(() => window.location.reload(), 150);
    } catch (e: any) {
      console.error('Error creating booking', e);
      setError(e?.message || String(e));
    }
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
        // Re-validate salida when entrada changes
        if (typeof trigger === 'function') trigger('fecha_salida');
        setValue("totalPagado", 0, { shouldValidate: true });
        setValue("number", 0, { shouldValidate: true });

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
    }
  }

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        ➕ Nueva Reservación
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

                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha de Entrada
                        </label>
                        <input
                          type="datetime-local"
                          max={getValues("fecha_salida")}
                          {...register("fecha_entrada", {
                            required: "La fecha de entrada es requerida"
                          })}
                          onInput={() => computeTotal()}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                        {errors.fecha_entrada && (
                          <span className="text-red-500 text-sm">
                            {errors.fecha_entrada.message}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Fecha de Salida
                        </label>
                        <input
                          id="fecha_salida_input"
                          type="datetime-local"
                          min={getValues("fecha_entrada")}
                          {...register("fecha_salida", {
                            required: "La fecha de salida es requerida"
                          })}
                          onInput={() => computeTotal()}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
                        />
                        {errors.fecha_salida && (
                          <span className="text-red-500 text-sm">
                            {errors.fecha_salida.message}
                          </span>
                        )}
                      </div>
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
                        {...register("notas")}
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
