import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import CategoryForm from '../form/CategoryForm';
import { dashboardCreateCategoryService } from '@/src/services/dashboard/category/dashboardCreateCategoryService';
import { CategoryFormData } from '@/src/types/dashboard/CategoryTypes';
import useResolveCategories from '@/src/hooks/dashboard/useResolveCategories';

type CreateCategoryFormProps = {
  closeModal: () => void;
};

export default function CreateCategoryForm({ closeModal }: CreateCategoryFormProps) {
  const { formatCategoryTwo, formatCategoryThree } = useResolveCategories();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CategoryFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateCategoryService,
    invalidateQuery: ['categories'],
    onSuccessCallback: closeModal,
    message: 'Categoria registrado exitosamente'
  })

  const onSubmit = (data: CategoryFormData) => mutate({ ...data, id_categoria_padre: data.id_categoria_padre === 0 ? null : data.id_categoria_padre, activo: 1 });

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >

      <CategoryForm
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        formatCategoryTwo={formatCategoryTwo}
        formatCategoryThree={formatCategoryThree}
      />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Categoria</Button>
      </div>
    </form>
  );
}
