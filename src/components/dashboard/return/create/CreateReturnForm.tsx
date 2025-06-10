import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import ReturnForm from '../form/ReturnForm';
import { ReturnFormData } from '@/src/types/dashboard/ReturnTypes';
import { dashboardCreateReturnService } from '@/src/services/dashboard/return/dashboardCreateReturnService';

type CreateReturnFormProps = {
  closeModal: () => void;
  idReturnProduct: ReturnFormData['id_producto'];
};

export default function CreateReturnForm({ closeModal, idReturnProduct }: CreateReturnFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReturnFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateReturnService,
    invalidateQuery: ['returns'],
    onSuccessCallback: closeModal,
    message: 'Devolucion registrada exitosamente'
  })

  const onSubmit = (data: ReturnFormData) => mutate({...data, activo: 1, id_producto: Number(idReturnProduct)});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ReturnForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Devolución</Button>
      </div>
    </form>
  );
}
