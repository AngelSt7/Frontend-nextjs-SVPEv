import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import ReturnSaleForm from '../form/ReturnSaleForm';
import { dashboardUpdateReturnSaleService } from '@/src/services/dashboard/return-sale/dashboardUpdateReturnSaleService';
import { SupplierById } from '@/src/types/DashboardTypes';

type EditReturnSaleFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditReturnForm({ user,closeModal, defaultValues }: EditReturnSaleFormProps) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReturnSaleFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateReturnSaleService,
    invalidateQuery: [
      ["returns-sales"],
      ["return-sale", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Devolución de venta actualizada exitosamente'
  })

  const onSubmit = (data: ReturnSaleFormData) => mutate({...data, activo: 1});

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
       <ReturnSaleForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Devolución de venta</Button>
      </div> 
    </form>
  );
}
