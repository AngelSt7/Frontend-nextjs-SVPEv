import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import CategoryForm from '../form/CategoryForm';
import { dashboardCreateCategoryService } from '@/src/services/dashboard/category/dashboardCreateCategoryService';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';
import { CategoryFormData } from '@/src/types/dashboard/CategoryTypes';

type CreateCategoryFormProps = {
  closeModal: () => void;
};

export default function CreateCategoryForm({ closeModal }: CreateCategoryFormProps) {
  const { data: categoryData = [] } = useGetCategories();
  const formatCategory = categoryData.map(category => ({ label: category.nombre,  activo: category.activo, id: category.id }))
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CategoryFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateCategoryService,
    invalidateQuery: ['categories'],
    onSuccessCallback: closeModal,
    message: 'Categoria registrado exitosamente'
  })

  const onSubmit = (data: CategoryFormData) => mutate({...data, activo: 1});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CategoryForm 
        formatCategory={formatCategory} 
        setValue={setValue} 
        watch={watch} 
        register={register} 
        errors={errors} 
      />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Categoria</Button>
      </div>
    </form>
  );
}
