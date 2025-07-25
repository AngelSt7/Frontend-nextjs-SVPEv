import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import SupplierForm from '../form/SupplierForm';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Supplier } from '@/src/services/dashboard/supplier/Supplier';
import { SupplierFormData } from '@/src/types/DashboardTypes';

type CreateSupplierFormProps = {
  closeModal: () => void;
};

export default function CreateSupplierForm({ closeModal }: CreateSupplierFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<SupplierFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: Supplier.create,
    invalidateQuery: ['suppliers'],
    onSuccessCallback: closeModal,
    message: 'Proveedor registrado exitosamente'
  })

  const onSubmit = (data: SupplierFormData) => mutate({ ...data, activo: 1});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SupplierForm register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Proveedor</Button>
      </div>
    </form>
  );
}
