import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDriveFileRenameOutline, MdOutlineAttachMoney, MdStorage, MdSecurity } from 'react-icons/md';
import { ProductFormData } from '@/src/types/ProductTypes';
import SelectItem from '../../ui/SelectItem';
import { Brands, SubCategories } from '@/src/utils/constants/provisionalData';

type ProductFormProps = {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
};

export default function ProductForm({ register, errors, watch, setValue }: ProductFormProps) {
  return (
    <div className="flex flex-col gap-3">

      <Input
        type="text"
        placeholder="Nombre del producto"
        htmlFor="nombre"
        label="Nombre"
        Icon={MdDriveFileRenameOutline}
        register={register('nombre', {
          required: 'Este campo es obligatorio',
          minLength: {
            value: 2,
            message: 'Debe tener al menos 2 caracteres',
          },
        })}
        errorMessage={errors.nombre}
      />

      <Input
        type="textarea"
        placeholder="Escribe la descripción del producto"
        htmlFor="descripcion"
        label="Descripción"
        register={register('descripcion')}
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
              message: 'El valor no puede ser negativo',
            },
            valueAsNumber: true,
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
            valueAsNumber: true,
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
              message: 'Debe ser un valor positivo',
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
              message: 'No puede ser negativo',
            },
            valueAsNumber: true,
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
              message: 'No puede ser negativo',
            },
            valueAsNumber: true,
          })}
          errorMessage={errors.max_stock}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <SelectItem
          name="id_subcategoria"
          label="Subcategoría"
          data={SubCategories}
          register={register('id_subcategoria', {
            required: 'Este campo es obligatorio',
            valueAsNumber: true,
          })}
          watch={watch}
          setValue={setValue}
          errorMessage={errors.id_subcategoria}
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
    </div>
  );
}
