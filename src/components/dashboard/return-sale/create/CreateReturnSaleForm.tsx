import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import ReturnSaleForm from '../form/ReturnSaleForm';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import { dashboardCreateReturnSaleService } from '@/src/services/dashboard/return-sale/dashboardCreateReturnSaleService';
import toast from 'react-hot-toast';

type CreateReturnSaleFormProps = {
  closeModal: () => void;
};

export default function CreateReturnSaleForm({ closeModal }: CreateReturnSaleFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReturnSaleFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateReturnSaleService,
    invalidateQuery: ['returns-sales'],
    onSuccessCallback: closeModal,
    message: 'Devolucion registrada exitosamente'
  })

  const onSubmit = (data: ReturnSaleFormData) => {
    const cantidad = data.productos.find(p => !isNaN(p.cantidad))?.cantidad ?? 0;
    if (!cantidad) return toast.error('Debe seleccionar almenos una cantidad para registrar la devolucion');
    mutate(data)
  }

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
