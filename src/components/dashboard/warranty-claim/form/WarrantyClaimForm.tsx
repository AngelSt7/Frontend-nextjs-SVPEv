import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { WarrantyClaimFormData } from '@/src/types/dashboard/WarrantyClaimTypes';
import Input from '@/src/components/ui/Input';

type WarrantyClaimFormProps = {
  register: UseFormRegister<WarrantyClaimFormData>;
  errors: FieldErrors<WarrantyClaimFormData>;
  watch: UseFormWatch<WarrantyClaimFormData>;
  setValue: UseFormSetValue<WarrantyClaimFormData>;
  isEdit?: boolean;
};

export default function WarrantyClaimForm({
  register,
  errors,
  watch,
  setValue,
  isEdit = false
}: WarrantyClaimFormProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* ID de Garantía ingresado manualmente */}
      {!isEdit && (
        <Input
          type="number"
          htmlFor="id_garantia"
          label="ID Garantía asociada"
          placeholder="Ej. 5"
          register={register('id_garantia', {
            required: 'Este campo es obligatorio',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Debe ser un ID válido mayor a 0'
            }
          })}
          errorMessage={errors.id_garantia}
        />
      )}

      <Input
        type="textarea"
        htmlFor="descripcion"
        label="Descripción del reclamo"
        placeholder="Detalles del problema o fallo..."
        maxLength={200}
        register={register('descripcion', {
          required: 'Este campo es obligatorio',
          minLength: {
            value: 10,
            message: 'Debe tener al menos 10 caracteres'
          },
          maxLength: {
            value: 200,
            message: 'No debe superar los 200 caracteres'
          }
        })}
        errorMessage={errors.descripcion}
      />

      {isEdit && (
        <Input
          type="text"
          htmlFor="estado"
          label="Estado del reclamo"
          placeholder="Ej: EN_PROCESO"
          register={register('estado')}
          errorMessage={errors.estado}
        />
      )}
    </div>
  );
}
