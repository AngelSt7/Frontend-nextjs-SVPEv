import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import ReturnSaleForm from '../form/ReturnSaleForm';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import { dashboardCreateReturnSaleService } from '@/src/services/dashboard/return-sale/dashboardCreateReturnSaleService';

type CreateReturnSaleFormProps = {
  closeModal: () => void;
  idReturnSaleDetail: ReturnSaleFormData['id_detalle'];
};

export default function CreateReturnSaleForm({ closeModal, idReturnSaleDetail }: CreateReturnSaleFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReturnSaleFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateReturnSaleService,
    invalidateQuery: ['returns-sales'],
    onSuccessCallback: closeModal,
    message: 'Devolucion registrada exitosamente'
  })

  const onSubmit = (data: ReturnSaleFormData) => mutate({...data, id_detalle: Number(idReturnSaleDetail)});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ReturnSaleForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Devolución</Button>
      </div>
    </form>
  );
}
