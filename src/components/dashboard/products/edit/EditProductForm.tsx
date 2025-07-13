import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { DashboardProductById, ProductFormData } from '@/src/types/dashboard/ProductTypes';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import ProductForm from '../form/ProductForm';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { Product } from '@/src/services/dashboard/product/Product';

type EditProductForm = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: DashboardProductById
};

export default function EditProductForm({ user,closeModal, defaultValues }: EditProductForm) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProductFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: Product.update,
    invalidateQuery: [
      ["products"],
      ["product", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Products actualizado exitosamente'
  })

  const onSubmit = (data: ProductFormData) => mutate({...data, id_usuario: user?.id!});

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
       <ProductForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Producto</Button>
      </div> 
    </form>
  );
}
