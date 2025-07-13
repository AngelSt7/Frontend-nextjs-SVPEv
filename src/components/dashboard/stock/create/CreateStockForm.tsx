import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import StockForm from '../form/StockForm';
import { StockFormData } from '@/src/types/dashboard/StockTypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { Stock } from '@/src/services/dashboard/stock/Stock';
import { useDataStockForm } from '@/src/hooks/dashboard/ui/useDataStockForm';

type CreateStockFormProps = {
  closeModal: () => void;
  user?: AuthUserInfo
};

export default function CreateStockForm({ closeModal, user }: CreateStockFormProps) {
  const { productOptions, suppliersOptions } = useDataStockForm()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<StockFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: Stock.create,
    invalidateQuery: ['stocks'],
    onSuccessCallback: closeModal,
    message: 'Stock registrado exitosamente'
  })

  const onSubmit = (data: StockFormData) => {
    mutate({ ...data, id_usuario: user!.id });
  }

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StockForm
        productOptions={productOptions}
        suppliersOptions={suppliersOptions}
        setValue={setValue}
        watch={watch}
        register={register}
        errors={errors}
      />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success'  className='dark:bg-green-700' type='submit'>Registrar Stock</Button>
      </div>
    </form>
  );
}