import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import StockForm from '../form/StockForm';
import { StockFormData } from '@/src/types/dashboard/StockTypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { dashboardCreateStockService } from '@/src/services/dashboard/stock/dashboardCreateStockService';
import { useGetProducts } from '@/src/hooks/dashboard/data/useGetProducts';
import { useGetSuppliers } from '@/src/hooks/dashboard/data/useGetSuppliers';
import { useMemo } from 'react';

type CreateStockFormProps = {
  closeModal: () => void;
  user?: AuthUserInfo
};

export default function CreateStockForm({ closeModal, user }: CreateStockFormProps) {
  const { data: products = [] } = useGetProducts();
  const { data: suppliers = [] } = useGetSuppliers();
  const productOptions = useMemo(() => products.filter(p => p.activo === 1).map(p => ({ label: p.nombre, value: p.id })), [products]);
  const suppliersOptions = useMemo(() => suppliers.filter(p => p.activo === 1).map((p) => ({ label: p.razon_social, value: p.id })), [suppliers])
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<StockFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateStockService,
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