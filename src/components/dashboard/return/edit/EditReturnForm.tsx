import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { ReturnFormData } from '@/src/types/dashboard/ReturnTypes';
import ReturnForm from '../form/ReturnForm';
import { dashboardUpdateReturnService } from '@/src/services/dashboard/return/dashboardUpdateReturnService';
import { SupplierById } from '@/src/types/DashboardTypes';

type EditReturnFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditReturnForm({ user,closeModal, defaultValues }: EditReturnFormProps) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReturnFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateReturnService,
    invalidateQuery: [
      ["returns"],
      ["return", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Descuento actualizado exitosamente'
  })

  const onSubmit = (data: ReturnFormData) => mutate({...data, activo: 1});

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
       <ReturnForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Categoria</Button>
      </div> 
    </form>
  );
}
