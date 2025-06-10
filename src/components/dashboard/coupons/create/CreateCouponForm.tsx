import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';

import CouponForm from '../form/CouponForm';
import { CouponFormData } from '@/src/types/dashboard/CouponTypes';
import { dashboardCreateCouponService } from '@/src/services/dashboard/coupon/dashboardCreateCouponService';

type CreateCuoponFormProps = {
  closeModal: () => void;
};

export default function CreateCouponForm({ closeModal }: CreateCuoponFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CouponFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateCouponService,
    invalidateQuery: ['coupons'],
    onSuccessCallback: closeModal,
    message: 'Cupón registrado exitosamente'
  })

  const onSubmit = (data: CouponFormData) => mutate({...data, activo: 1});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CouponForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Categoria</Button>
      </div>
    </form>
  );
}
