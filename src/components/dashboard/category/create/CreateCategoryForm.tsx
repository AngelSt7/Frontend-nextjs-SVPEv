import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { UserFormData } from '@/src/types/UserTypes';
import { dashboardCreateUserService } from '@/src/services/dashboard/users/dashboardCreateUserService';
import CategoryForm from '../form/CategoryForm';
import { CategoryFormData } from '@/src/types/CategoryTypes';
import { dashboardCreateCategoryService } from '@/src/services/dashboard/category/dashboardCreateCategoryService';

type CreateCategoryFormProps = {
  closeModal: () => void;
};
// http://localhost:7575/autenticacion/registro
export default function CreateCategoryForm({ closeModal }: CreateCategoryFormProps) {
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
      <CategoryForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Categoria</Button>
      </div>
    </form>
  );
}
