import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import CategoryForm from '../form/CategoryForm';
import { dashboardUpdateCategoryService } from '@/src/services/dashboard/category/dashboardUpdateCategoryService';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';
import { CategoryFormData, DashboardCategoryById } from '@/src/types/dashboard/CategoryTypes';

type EditCategoryForm = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: DashboardCategoryById
};

export default function EditCategoryForm({ user, closeModal, defaultValues }: EditCategoryForm) {
  const { data: categoryData = [] } = useGetCategories();
  const formatCategory = categoryData.map((category) => ({ label: category.nombre, id: category.id, activo: category.activo }));
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CategoryFormData>({
    defaultValues: {
      ...defaultValues,
      id_categoria_padre: defaultValues.id_padre
    }
  });

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
      <CategoryForm formatCategory={formatCategory} register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Categoria</Button>
      </div>
    </form>
  );
}
