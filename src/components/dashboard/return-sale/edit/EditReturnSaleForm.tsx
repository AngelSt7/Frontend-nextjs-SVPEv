import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { DashboardReturnSaleById, ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import ReturnSaleForm from '../form/ReturnSaleForm';
import { ReturnSale } from '@/src/services/dashboard/return-sale/ReturnSale';

type EditReturnSaleFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: DashboardReturnSaleById
};


export default function EditReturnForm({ closeModal, defaultValues }: EditReturnSaleFormProps) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReturnSaleFormData>({
    defaultValues: {
      id_registro_venta: defaultValues.id_venta,
      motivo: defaultValues.motivo,
    }
  });

  const { mutate } = useSubmitMutation({
    serviceFunction: ReturnSale.update,
    invalidateQuery: [
      ["returns-sales"],
      ["return-sale", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Devolución de venta actualizada exitosamente'
  })

  const onSubmit = (data: ReturnSaleFormData) => mutate({ ...data });

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ReturnSaleForm register={register} errors={errors} watch={watch} setValue={setValue} productsReturn={defaultValues.detalles} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Devolución de venta</Button>
      </div>
    </form>
  );
}
