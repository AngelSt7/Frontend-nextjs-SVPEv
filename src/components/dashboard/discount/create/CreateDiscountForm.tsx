import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { DiscountFormData } from '@/src/types/dashboard/DiscountTypes';
import DiscountForm from '../form/DiscountForm';
import { dashboardCreateDiscountService } from '@/src/services/dashboard/discount/dashboardCreateDiscountService';

type CreateDiscountFormProps = {
  closeModal: () => void;
};

export default function CreateDiscountForm({ closeModal }: CreateDiscountFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DiscountFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateDiscountService,
    invalidateQuery: ['discounts'],
    onSuccessCallback: closeModal,
    message: 'Descuento registrado exitosamente'
  })
// mutate(data);
  const onSubmit = (data: DiscountFormData) => mutate(data);

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DiscountForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Descuento</Button>
      </div>
    </form>
  );
}
