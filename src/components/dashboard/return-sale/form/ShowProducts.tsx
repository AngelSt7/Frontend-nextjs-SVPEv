import Input from '@/src/components/ui/Input';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import { UseFormRegister, FieldErrors, FieldError } from 'react-hook-form';

type ShowProductsProps = {
  index: number;
  detail: {
    id: number;
    producto: string;
    cantidad: number;
  };
  register: UseFormRegister<ReturnSaleFormData>;
  errors: FieldErrors<ReturnSaleFormData>;
};

export default function ShowProducts({ detail, register, errors, index }: ShowProductsProps) {
  return (
    <div className="flex gap-2">
      <div className="w-full">
        <p className="font-semibold text-zinc-800">
          Cantidad disponible: <span className="font-medium text-zinc-600">{detail.cantidad}</span>
        </p>
        <p className="font-semibold text-zinc-800">
          Producto: <span className="font-medium text-zinc-600">{detail.producto}</span>
        </p>
      </div>

      <Input
        type="number"
        placeholder="Cantidad"
        htmlFor={`productos.${index}.cantidad`}
        register={register(`productos.${index}.cantidad`, {
          min: {
            value: 0,
            message: 'Debe ser 0 o más',
          },
          max: {
            value: detail.cantidad,
            message: `La cantidad no debe ser mayor a ${detail.cantidad}`,
          },
          valueAsNumber: true,
        })}
        errorMessage={errors.productos?.[index]?.cantidad as FieldError}
      />
    </div>
  );
}
