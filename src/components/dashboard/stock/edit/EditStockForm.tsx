import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import StockForm from '../form/StockForm';
import { DashboardStockById, StockFormData } from '@/src/types/dashboard/StockTypes';
import { useGetProducts } from '@/src/hooks/dashboard/data/useGetProducts';
import { useGetSuppliers } from '@/src/hooks/dashboard/data/useGetSuppliers';
import { dashboardUpdateStockService } from '@/src/services/dashboard/stock/dashboardUpdateStockService';
import { useMemo } from 'react';
import { normalizeStockData } from '@/src/utils/normalize/normalizeStockData';

type EditCouponFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: DashboardStockById
};

export default function EditStockForm({ user, closeModal, defaultValues }: EditCouponFormProps) {
  const { data: products = [] } = useGetProducts();
  const { data: suppliers = [] } = useGetSuppliers();
  const productOptions = useMemo(() => products.filter(p => p.activo === 1).map(p => ({ label: p.nombre, value: p.id })), [products]);
  const suppliersOptions = useMemo(() => suppliers.map((p) => ({ label: p.razon_social, value: p.id })), [suppliers])

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<StockFormData>({
    defaultValues: normalizeStockData(defaultValues)
  })

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateStockService,
    invalidateQuery: [
      ["stocks"],
      ["stock", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Stock actualizado exitosamente'
  })

  const onSubmit = (data: StockFormData) =>  mutate({ ...data, id_usuario: user!.id, id_ingreso: defaultValues.id });

  if (defaultValues && productOptions && suppliersOptions) return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StockForm
        productOptions={productOptions}
        suppliersOptions={suppliersOptions}
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Stock</Button>
      </div>
    </form>
  );
}
