import Input from '@/src/components/ui/Input';
import { SupplierFormData } from '@/src/types/DashboardTypes';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FaRegIdCard } from 'react-icons/fa';
import { MdOutlineMail, MdPermIdentity, MdLocationOn, MdPhone, MdPhoneIphone } from 'react-icons/md';

type SupplierFormProps = {
  register: UseFormRegister<SupplierFormData>;
  errors: FieldErrors<SupplierFormData>;
};

export default function SupplierForm({ register, errors }: SupplierFormProps) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        type="text"
        placeholder="Razón social del proveedor"
        htmlFor="razon_social"
        label="Razón Social"
        Icon={MdPermIdentity}
        register={register('razon_social', {
          required: 'Este campo es obligatorio',
          minLength: {
            value: 2,
            message: 'Debe tener al menos 2 caracteres',
          },
        })}
        errorMessage={errors.razon_social}
      />

      <Input
        type="email"
        placeholder="Email de contacto"
        htmlFor="correo"
        label="Correo electrónico"
        Icon={MdOutlineMail}
        register={register('correo', {
          required: 'Este campo es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'El formato del correo electrónico no es válido',
          },
        })}
        errorMessage={errors.correo}
      />

      <div className='flex gap-5'>
        <Input
          type="text"
          placeholder="Celular del proveedor"
          htmlFor="celular"
          label="Celular"
          Icon={MdPhoneIphone}
          register={register('celular', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[0-9]{9}$/,
              message: 'El número de celular debe tener 9 dígitos',
            },
          })}
          errorMessage={errors.celular}
        />

        <Input
          type="text"
          placeholder="RUC del proveedor"
          htmlFor="ruc"
          label="RUC"
          Icon={FaRegIdCard}
          register={register('ruc', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[0-9]{11}$/,
              message: 'El RUC debe tener 11 dígitos numéricos',
            },
          })}
          errorMessage={errors.ruc}
        />
      </div>

      <div className='flex gap-5'>
        <Input
          type="text"
          placeholder="Dirección del proveedor"
          htmlFor="direccion"
          label="Dirección"
          Icon={MdLocationOn}
          register={register('direccion', {
            required: 'Este campo es obligatorio',
            minLength: {
              value: 5,
              message: 'La dirección debe tener al menos 5 caracteres',
            },
          })}
          errorMessage={errors.direccion}
        />

        <Input
          type="text"
          placeholder="Teléfono fijo (opcional)"
          htmlFor="telefono"
          label="Teléfono"
          Icon={MdPhone}
          register={register('telefono', {
            pattern: {
              value: /^[0-9]{7}$/,
              message: "Debe contener exactamente 7 dígitos numéricos",
            },
          })}
          errorMessage={errors.telefono}
        />

      </div>
    </div>
  )
}
