import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import ReturnSaleForm from '../form/ReturnSaleForm';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import toast from 'react-hot-toast';
import { ReturnSale } from '@/src/services/dashboard/return-sale/ReturnSale';

type CreateReturnSaleFormProps = {
  closeModal: () => void;
};

export default function CreateReturnSaleForm({ closeModal }: CreateReturnSaleFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ReturnSaleFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: ReturnSale.create,
    invalidateQuery: ['returns-sales'],
    onSuccessCallback: closeModal,
    message: 'Devolucion registrada exitosamente'
  })

  const onSubmit = (data: ReturnSaleFormData) => {
    const noneSelected = data.devolucion.every(p => p.cantidad === 0);
    if (noneSelected) return toast.error('Debe seleccionar al menos un producto para devolver');
    mutate({...data, id_usuario: 1, devolucion: [...data.devolucion.filter(p => p.cantidad > 0).map(p =>({id_producto: 40, cantidad: p.cantidad}))]});
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
