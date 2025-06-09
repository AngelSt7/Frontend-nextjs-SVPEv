import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { DiscountFormData } from '@/src/types/DiscountTypes';
import DiscountForm from '../form/DiscountForm';
import { dashboardCreateDiscountService } from '@/src/services/dashboard/discount/dashboardCreateDiscountService';
import { today, getLocalTimeZone } from "@internationalized/date";


type CreateDiscountFormProps = {
  closeModal: () => void;
};

export default function CreateDiscountForm({ closeModal }: CreateDiscountFormProps) {
  const hoy = today(getLocalTimeZone());
const unaSemanaDespues = hoy.add({ weeks: 1 });
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DiscountFormData>({
    defaultValues: {
      fecha_final: '',
      fecha_inicio: '',
    }
  });
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateDiscountService,
    invalidateQuery: ['users'],
    onSuccessCallback: closeModal,
    message: 'Usuario registrado exitosamente'
  })

  const onSubmit = (data: DiscountFormData) => console.log(data);

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DiscountForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Usuario</Button>
      </div>
    </form>
  );
}
