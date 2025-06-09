import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDriveFileRenameOutline, MdOutlineAttachMoney, MdStorage, MdSecurity } from 'react-icons/md';
import { ProductFormData } from '@/src/types/ProductTypes';
import SelectItem from '../../ui/SelectItem';
import { Brands } from '@/src/utils/constants/provisionalData';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';

type ProductFormProps = {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
};


export default function ProductForm({ register, errors, watch, setValue }: ProductFormProps) {
  const { data: categoryData = [] } = useGetCategories();

  return (
    <div className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Nombre del producto"
        htmlFor="nombre"
        label="Nombre"
        maxLength={50}
        Icon={MdDriveFileRenameOutline}
        register={register('nombre', {
          required: 'Este campo es obligatorio',
          pattern: {
            value: /^[A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s]{8,50}$/,
            message: 'Debe tener entre 8 y 50 caracteres (letras y números)',
          },
        })}
        errorMessage={errors.nombre}
      />

      <Input
        type="textarea"
        placeholder="Escribe la descripción del producto"
        htmlFor="descripcion"
        label="Descripción"
        maxLength={100}
        register={register('descripcion', {
          required: 'Este campo es obligatorio',
          minLength: {
            value: 10,
            message: 'Debe tener al menos 10 caracteres',
          },
          maxLength: {
            value: 100,
            message: 'Debe tener menos de 100 caracteres',
          },
        })}
        errorMessage={errors.descripcion}
      />

      <div className="grid grid-cols-3 gap-5 items-center">
        <Input
          type="number"
          placeholder="Precio de compra"
          htmlFor="precio_compra"
          label="Precio Compra"
          Icon={MdOutlineAttachMoney}
          register={register('precio_compra', {
            required: 'Este campo es obligatorio',
            min: {
              value: 0,
              message: 'No puede ser negativo',
            },
            max: {
              value: 10000,
              message: 'No puede exceder los 10,000',
            },
            valueAsNumber: true,
            validate: (value) =>
              value < watch('precio_venta') ||
              'Debe ser menor que el precio de venta',
          })}
          errorMessage={errors.precio_compra}
        />

        <Input
          type="number"
          placeholder="Precio de venta"
          htmlFor="precio_venta"
          label="Precio de Venta"
          Icon={MdOutlineAttachMoney}
          register={register('precio_venta', {
            required: 'Este campo es obligatorio',
            min: {
              value: 0,
              message: 'No puede ser negativo',
            },
            max: {
              value: 10000,
              message: 'No puede exceder los 10,000',
            },
            valueAsNumber: true,
            validate: (value) =>
              value > watch('precio_compra') ||
              'Debe ser mayor que el precio de compra',
          })}
          errorMessage={errors.precio_venta}
        />

        <Input
          type="number"
          placeholder="Garantía en meses"
          htmlFor="garantia_meses"
          label="Garantía (meses)"
          Icon={MdSecurity}
          register={register('garantia_meses', {
            required: 'Este campo es obligatorio',
            min: {
              value: 0,
              message: 'Debe ser positivo',
            },
            max: {
              value: 48,
              message: 'No puede superar los 48 meses',
            },
            valueAsNumber: true,
          })}
          errorMessage={errors.garantia_meses}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Input
          type="number"
          placeholder="Stock mínimo"
          htmlFor="min_stock"
          label="Stock mínimo"
          Icon={MdStorage}
          register={register('min_stock', {
            required: 'Este campo es obligatorio',
            min: {
              value: 0,
              message: 'Debe ser positivo',
            },
            valueAsNumber: true,
            validate: (value) =>
              value <= watch('max_stock') ||
              'No puede ser mayor que el stock máximo',
          })}
          errorMessage={errors.min_stock}
        />

        <Input
          type="number"
          placeholder="Stock máximo"
          htmlFor="max_stock"
          label="Stock máximo"
          Icon={MdStorage}
          register={register('max_stock', {
            required: 'Este campo es obligatorio',
            min: {
              value: 0,
              message: 'Debe ser positivo',
            },
            max: {
              value: 10000,
              message: 'No puede exceder los 10,000',
            },
            valueAsNumber: true,
            validate: (value) =>
              value >= watch('min_stock') ||
              'No puede ser menor que el stock mínimo',
          })}
          errorMessage={errors.max_stock}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <SelectItem
          name="id_categoria"
          label="Categoría"
          data={categoryData}
          register={register('id_categoria', {
            required: 'Este campo es obligatorio',
            valueAsNumber: true,
          })}
          watch={watch}
          setValue={setValue}
          errorMessage={errors.id_categoria}
        />

        <SelectItem
          name="id_marca"
          label="Marca"
          data={Brands}
          register={register('id_marca', {
            required: 'Este campo es obligatorio',
            valueAsNumber: true,
          })}
          watch={watch}
          setValue={setValue}
          errorMessage={errors.id_marca}
        />
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Campos opcionales</p>
        <div className="grid grid-cols-2 gap-5">
          <Input
            type="text"
            placeholder="Modelo (opcional)"
            htmlFor="modelo"
            label="Modelo"
            register={register('modelo')}
            errorMessage={errors.modelo}
          />
          <Input
            type="text"
            placeholder="Color (opcional)"
            htmlFor="color"
            label="Color"
            register={register('color')}
            errorMessage={errors.color}
          />
        </div>
      </div>
    </div>
  );
}
