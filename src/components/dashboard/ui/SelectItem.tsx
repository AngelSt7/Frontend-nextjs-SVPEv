import Errors from "@/src/components/ui/Errors";
import { Select, SelectItem as HeroSelectItem } from "@heroui/react";
import {
    FieldError, FieldErrorsImpl, FieldValues, Merge, Path, PathValue, UseFormRegisterReturn, UseFormSetValue, UseFormWatch,
} from "react-hook-form";

type SelectItemProps<T extends FieldValues> = {
    data: { id: string | number; label?: string; nombre?: string; activo: boolean | number; }[];
    register: UseFormRegisterReturn;
    errorMessage?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
    name: Path<T>;
    label?: string;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
};

export default function SelectItem<T extends FieldValues>({ data, register, errorMessage, name, label = "Seleccionar opción", watch, setValue }: SelectItemProps<T>) {

    const selectedValue = watch(name);
    const handleChange = (value: string) => { setValue(name, Number(value) as PathValue<T, Path<T>>, { shouldValidate: true }); };

    return (
        <div className="w-full">
            <label htmlFor={name} className="text-base font-semibold text-[#202021]">
                {label}
            </label>

            <input type="hidden" {...register} />

            <div
                className={`border rounded-md mt-1 ${errorMessage ? "ring-1 ring-[#d10b30]" : "border-[#afaeae]"
                    }`}
            >
                <Select
                    className="w-full"
                    items={data}
                    size="lg"
                    radius="sm"
                    placeholder="Selecciona una opción"
                    selectedKeys={selectedValue ? [selectedValue.toString()] : []}
                    onSelectionChange={(keys) => handleChange(Array.from(keys)[0] as string)}
                    disabledKeys={data.filter(item => item.activo === 0 ? item.id.toString() : null).map(item => item.id.toString())}
                >
                    {(item) => (
                        <HeroSelectItem key={item.id.toString()}>
                            {item.label ?? item.nombre}
                        </HeroSelectItem>
                    )}
                </Select>
            </div>

            {errorMessage && <Errors>{errorMessage.message?.toString()}</Errors>}
        </div>
    );
}
