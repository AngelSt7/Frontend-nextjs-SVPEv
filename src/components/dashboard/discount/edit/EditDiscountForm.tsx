import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { DashboardDiscountById, DiscountFormData } from '@/src/types/dashboard/DiscountTypes';
import DiscountForm from '../form/DiscountForm';
import { Discount } from '@/src/services/dashboard/discount/Discount';
import { normalizeDiscount } from '@/src/utils/normalize/nromalizeDiscount';

type EditDiscountForm = {
  closeModal: () => void;
  defaultValues: DashboardDiscountById
};

export default function EditDiscountForm({ closeModal, defaultValues }: EditDiscountForm) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DiscountFormData>({
    defaultValues: normalizeDiscount(defaultValues)});

  const { mutate } = useSubmitMutation({
    serviceFunction: Discount.update,
    invalidateQuery: [
      ["discounts"],
      ["discount", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Descuento actualizado exitosamente'
  })

  const onSubmit = (data: DiscountFormData) => mutate(data);

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
       <DiscountForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Descuento</Button>
      </div> 
    </form>
  );
}
