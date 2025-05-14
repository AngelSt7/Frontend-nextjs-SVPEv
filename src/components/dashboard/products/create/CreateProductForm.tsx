import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import ProductForm from '../form/ProductForm'; // Asegúrate de que esta sea la ruta correcta
import { ProductFormData } from '@/src/types/ProductTypes';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { dashboardProductCreateProductService } from '@/src/services/dashboard/product/dashboardProductCreateProductService';

type CreateProductFormProps = { closeModal: () => void; };

export default function CreateProductForm({ closeModal }: CreateProductFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProductFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardProductCreateProductService,
    invalidateQuery: ['products'],
    onSuccessCallback: closeModal,
    message: 'Producto registrado exitosamente'
  });

  const onSubmit = (data: ProductFormData) => mutate({...data, activo: 1, id_usuario: 1});

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ProductForm register={register} errors={errors} setValue={setValue} watch={watch} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Producto</Button>
      </div>
    </form>
  );
}
