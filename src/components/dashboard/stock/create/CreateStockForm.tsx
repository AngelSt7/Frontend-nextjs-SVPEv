import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import StockForm from '../form/StockForm';
import { StockFormData } from '@/src/types/dashboard/Stocktypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { dashboardCreateStockService } from '@/src/services/dashboard/stock/dashboardCreateStockService';

type CreateStockFormProps = {
  closeModal: () => void;
  user?: AuthUserInfo
};

export default function CreateStockForm({ closeModal, user }: CreateStockFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<StockFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateStockService,
    invalidateQuery: ['stocks'],
    onSuccessCallback: closeModal,
    message: 'Stock registrado exitosamente'
  })

  const onSubmit = (data: StockFormData) => mutate({...data, id_usuario: user?.id!});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StockForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Stock</Button>
      </div>
    </form>
  );
}
