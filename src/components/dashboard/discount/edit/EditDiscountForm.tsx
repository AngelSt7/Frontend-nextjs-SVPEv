import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { SupplierById } from '@/src/types/DashboardTypes';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { DiscountFormData } from '@/src/types/DiscountTypes';
import DiscountForm from '../form/DiscountForm';
import { dashboardUpdateDiscountService } from '@/src/services/dashboard/discount/dashboardUpdateDiscountService';

type EditDiscountForm = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditDiscountForm({ user,closeModal, defaultValues }: EditDiscountForm) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<DiscountFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateDiscountService,
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
        <Button color='success' type='submit'>Actualizar Categoria</Button>
      </div> 
    </form>
  );
}
