import Input from '@/src/components/ui/Input';
import { CreateSupplier } from '@/src/types/DashboardTypes';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { FaRegIdCard } from 'react-icons/fa';
import { MdOutlineMail, MdPermIdentity, MdPerson, MdPersonOutline, MdPhoneIphone } from 'react-icons/md';
import SelectCategory from './SelectCategory';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { dashboardCreateSupplier } from '@/src/services/dashboard/dashboardCreateSupplier';

type CreateSupplierFormProps = {
  closeModalCreate: () => void
}

export default function CreateSupplierForm({ closeModalCreate } : CreateSupplierFormProps) {
  const { register, handleSubmit, formState: { errors }, reset, setValue : setValueCategory } = useForm<CreateSupplier>();

  const { mutate } = useMutation({
    mutationFn: dashboardCreateSupplier,
    onError: (error) => toast.error(error.message || 'Error inesperado'),
    onSuccess: (data) => toast.success(data),
  })

  const onSubmit = (data: CreateSupplier) => {
    mutate(data)
    closeModalCreate()
  };

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3">
        <div className=' flex gap-5'>
          <Input
            type="text"
            placeholder="Nombre de proovedor"
            htmlFor="nombre"
            label="Nombre"
            Icon={MdPerson}
            register={register('nombre', {
              required: 'Este campo es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres',
              },
            })}
            errorMessage={errors.nombre}
          />

          <Input
            type="text"
            placeholder="Apellido del proveedor"
            htmlFor="apellido"
            label="Apellido"
            Icon={MdPersonOutline}
            register={register('apellido', {
              required: 'Este campo es obligatorio',
              minLength: {
                value: 2,
                message: 'El apellido debe tener al menos 2 caracteres',
              },
            })}
            errorMessage={errors.apellido}
          />
        </div>

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

        <Input
          type="text"
          placeholder="DNI de proveedor"
          htmlFor="dni"
          label="DNI"
          Icon={MdPermIdentity}
          register={register('dni', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[0-9]{8}$/,
              message: 'El DNI debe tener 8 dígitos numéricos',
            },
          })}
          errorMessage={errors.dni}
        />

        <div className=' flex gap-5'>
          <Input
            type="text"
            placeholder="Contacto del proveedor"
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

        <SelectCategory errors={errors} register={register} setValueCategory={setValueCategory} />
      </div>
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModalCreate()}>Cancelar</Button>
        <Button color='success' type='submit' >Registrar Proveedor</Button>
      </div>
    </form>
  )
}
