import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { WarrantyFormData } from '@/src/types/dashboard/WarrantyTypes';
import Input from '@/src/components/ui/Input';

type WarrantyFormProps = {
  register: UseFormRegister<WarrantyFormData>;
  errors: FieldErrors<WarrantyFormData>;
  watch: UseFormWatch<WarrantyFormData>;
  setValue: UseFormSetValue<WarrantyFormData>;
  isEdit?: boolean;
};

export default function WarrantyForm({
  register,
  errors,
  watch,
  setValue,
  isEdit = false
}: WarrantyFormProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Ingresar manualmente el ID del detalle de venta */}
      {!isEdit && (
        <Input
          type="number"
          htmlFor="id_detalle_venta"
          label="ID Detalle de Venta"
          placeholder="Ej. 123"
          register={register('id_detalle_venta', {
            required: 'Este campo es obligatorio',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Debe ser un ID válido mayor a 0'
            }
          })}
          errorMessage={errors.id_detalle_venta}
        />
      )}

      <Input
        type="date"
        htmlFor="inicio_garantia"
        label="Inicio de garantía"
        placeholder="Selecciona una fecha"
        register={register('inicio_garantia', {
          required: 'Este campo es obligatorio'
        })}
        errorMessage={errors.inicio_garantia}
      />

      <Input
        type="date"
        htmlFor="fin_garantia"
        label="Fin de garantía"
        placeholder="Selecciona una fecha"
        register={register('fin_garantia', {
          required: 'Este campo es obligatorio'
        })}
        errorMessage={errors.fin_garantia}
      />
    </div>
  );
}