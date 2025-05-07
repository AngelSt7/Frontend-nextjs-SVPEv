import Errors from "@/src/components/ui/Errors";
import { CreateSupplier } from "@/src/types/DashboardTypes";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue, useFormContext } from "react-hook-form";

export const Category = [
  { key: "1", label: "Teclados" },
  { key: "2", label: "Monitores" },
  { key: "3", label: "Tarjetas madres" },
  { key: "4", label: "SSD" },
  { key: "5", label: "Cables" },
];

type SelectCategoryProps = {
  setValueCategory: UseFormSetValue<CreateSupplier>;
  register: UseFormRegister<CreateSupplier>;
  errors: FieldErrors<CreateSupplier>;
};

export default function SelectCategory({ errors, register, setValueCategory }: SelectCategoryProps) {
  const [value, setValue] = useState<string>("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setValue(selected);
    setValueCategory("id_categoria", selected, { shouldValidate: true });
  };

  return (
    <>
      <label htmlFor="input-category" className="text-base font-semibold text-[#202021]">
        Categoría
      </label>

      <div className={` border border-[#afaeae] rounded-md ${errors.id_categoria ? 'ring-1 ring-[#d10b30] ' : ''}`}>
      <Select
        className="w-full "
        items={Category}
        size="lg"
        radius="sm"
        placeholder="Selecciona una categoría"
        selectedKeys={[value]}
        onChange={handleSelectionChange}
        >
        {(category) => <SelectItem>{category.label}</SelectItem>}
      </Select>
      </div>

      <input
        type="hidden"
        {...register("id_categoria", { required: "Selecciona una categoría" })}
      />
      {errors.id_categoria && <Errors> {errors.id_categoria?.message} </Errors>}
    
    </>
  );
}
