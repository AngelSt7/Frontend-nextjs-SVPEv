import { Switch } from "@heroui/react";
import { useEffect, useState } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldValues,
} from "react-hook-form";
import SerieTabs from "./SerieTabs";

type SerieControlProps<T extends FieldValues> = {
  name: Path<T>;
  tabsName: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export default function SerieControl<T extends FieldValues>({
  name,
  tabsName,
  label = "Habilitar Series",
  register,
  setValue,
  watch,
  errorMessage,
}: SerieControlProps<T>) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const value = isSelected ? "CON_SERIE" : "SIN_SERIE";
    setValue(name, value as PathValue<T, Path<T>>, { shouldValidate: true });
  }, [isSelected]);

  return (
    <div>
      <div className="flex gap-4 mt-2 justify-between">
        <label className="text-base font-semibold text-[#202021] dark:text-[#c5c5c7]">{label}</label>
        <Switch isSelected={isSelected} onValueChange={setIsSelected} size="sm" />
      </div>

      <SerieTabs
        isEnabled={isSelected}
        name={tabsName}
        register={register(tabsName)}
        setValue={setValue}
        watch={watch}
        errorMessage={errorMessage as FieldError}
      />
    </div>
  );
}
