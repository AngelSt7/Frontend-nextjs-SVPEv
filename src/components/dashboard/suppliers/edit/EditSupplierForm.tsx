import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import SupplierForm from '../form/SupplierForm';
import { SupplierById, SupplierFormData } from '@/src/types/dashboard/DashboardTypes';
import { dashboardUpdateSupplierService } from '@/src/services/dashboard/supplier/dashboardUpdateSupplierService';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';

type EditSupplierFormProps = {
  id: string | undefined;
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditSupplierForm({ id, closeModal, defaultValues }: EditSupplierFormProps) {

  const { register, handleSubmit, formState: { errors } } = useForm<SupplierFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateSupplierService,
    invalidateQuery: [
      ["supplier", id],,
      ['suppliers']
    ],
    onSuccessCallback: closeModal,
    message: 'Proveedor actualizado exitosamente'
  })

  const onSubmit = (data: SupplierFormData) => mutate({ ...data, activo: 1 });

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SupplierForm register={register} errors={errors} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualziar Proveedor</Button>
      </div>
    </form>
  );
}
