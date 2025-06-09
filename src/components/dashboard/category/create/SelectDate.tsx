import { FieldError, FieldErrorsImpl, Merge, FieldValues, Path, PathValue, UseFormRegisterReturn, UseFormSetValue, UseFormWatch} from "react-hook-form";
import { DateValue, RangeCalendar, RangeValue } from '@heroui/react';
import { parseDate } from "@internationalized/date";
import Errors from "@/src/components/ui/Errors";

type SelectDateProps<T extends FieldValues> = {
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  registerInicio: UseFormRegisterReturn;
  registerFinal: UseFormRegisterReturn;
  nameInicio: Path<T>;
  nameFinal: Path<T>;
  errorMessage: {
    [key: string]: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  };
};

export default function SelectDate<T extends FieldValues>({
  watch,
  setValue,
  registerInicio,
  registerFinal,
  nameInicio,
  nameFinal,
  errorMessage
}: SelectDateProps<T>) {

  const fecha_inicio = watch(nameInicio) as string;
  const fecha_final = watch(nameFinal) as string;

  const value: RangeValue<DateValue> | null =
    fecha_inicio && fecha_final
      ? { start: parseDate(fecha_inicio), end: parseDate(fecha_final) }
      : null;

  const onChange = (range: RangeValue<DateValue>) => {
    setValue(nameInicio, range.start.toString() as PathValue<T, Path<T>>, { shouldValidate: true });
    setValue(nameFinal, range.end.toString() as PathValue<T, Path<T>>, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <input type="hidden" {...registerInicio} />
      <input type="hidden" {...registerFinal} />

      <label className="text-base font-semibold text-[#202021]">Seleccionar fechas hábiles</label>

      <RangeCalendar
        aria-label="Seleccionar rango de fechas"
        value={value}
        onChange={onChange}
        color="success"
      />

      <div className='flex justify-between '>
        <p className="text-zinc-800">
          Fecha de inicio: <span className="font-bold">{value?.start?.toString() || 'No seleccionada'}</span>
        </p>
        <p className="text-zinc-800">
          Fecha de fin: <span className="font-bold">{value?.end?.toString() || 'No seleccionada'}</span>
        </p>
      </div>

      {(errorMessage[nameInicio] || errorMessage[nameFinal]) && (
        <Errors>{`Seleccione las fechas de inicio y fin`}</Errors>
      )}
    </div>
  );
}
