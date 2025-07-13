import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import CouponForm from '../form/CouponForm';
import { CouponFormData, DashboardCuponById } from '@/src/types/dashboard/CouponTypes';
import { Coupon } from '@/src/services/dashboard/coupon/Coupon';
import { normalizeCoupon } from '@/src/utils/normalize/normalizeCouponForm';

type EditCouponFormProps = {
  closeModal: () => void;
  defaultValues: DashboardCuponById
};

export default function EditCouponForm({ closeModal, defaultValues }: EditCouponFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CouponFormData>({defaultValues: normalizeCoupon(defaultValues)});

  const { mutate } = useSubmitMutation({
    serviceFunction: Coupon.update,
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
        <Button color='success' type='submit'>Actualizar Cupón</Button>
      </div> 
    </form>
  );
}
