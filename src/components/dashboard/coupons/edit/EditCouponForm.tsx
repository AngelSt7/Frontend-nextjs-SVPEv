import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { SupplierById } from '@/src/types/dashboard/DashboardTypes';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import CouponForm from '../form/CouponForm';
import { CouponFormData } from '@/src/types/dashboard/CouponTypes';
import { dashboardUpdateCouponService } from '@/src/services/dashboard/coupon/dashboardUpdateCouponService';

type EditCouponFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditCouponForm({ user,closeModal, defaultValues }: EditCouponFormProps) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CouponFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateCouponService,
    invalidateQuery: [
      ["coupons"],
      ["coupon", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Cupón actualizado exitosamente'
  })

  const onSubmit = (data: CouponFormData) => mutate(data);

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
       <CouponForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Categoria</Button>
      </div> 
    </form>
  );
}
