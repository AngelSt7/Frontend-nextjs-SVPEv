import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { dashboardUpdatProductService } from '@/src/services/dashboard/product/dashboardUpdatProductService';
import { SupplierById } from '@/src/types/DashboardTypes';
import { ProductFormData } from '@/src/types/ProductTypes';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { CategoryFormData } from '@/src/types/CategoryTypes';
import CategoryForm from '../form/CategoryForm';
import { dashboardUpdateCategoryService } from '@/src/services/dashboard/category/dashboardUpdateCategoryService';

type EditCategoryForm = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditCategoryForm({ user,closeModal, defaultValues }: EditCategoryForm) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CategoryFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateCategoryService,
    invalidateQuery: [
      ["categories"],
      ["category", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Categoria actualizado exitosamente'
  })

  const onSubmit = (data: CategoryFormData) => mutate(data);

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
       <CategoryForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Categoria</Button>
      </div> 
    </form>
  );
}
