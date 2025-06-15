import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import ReturnForm from '../form/ReturnProductForm';
import { dashboardCreateReturnProductService } from '@/src/services/dashboard/return/dashboardCreateReturnService';
import { ReturnProductFormData } from '@/src/types/dashboard/ReturnProductTypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type CreateReturnFormProps = {
  closeModal: () => void;
  user?: AuthUserInfo
};

export default function CreateReturnProductForm({ closeModal, user }: CreateReturnFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReturnProductFormData>({
    defaultValues: { reposicion_aplicada: 0 }
  });
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateReturnProductService,
    invalidateQuery: ['returnsProducts'],
    onSuccessCallback: closeModal,
    message: 'Devolucion registrada exitosamente'
  })

  const onSubmit = (data: ReturnProductFormData) => mutate({...data, id_usuario: user!.id});

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
