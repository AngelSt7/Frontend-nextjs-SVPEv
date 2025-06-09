import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { UserFormData } from '@/src/types/UserTypes';
import UserForm from '../form/UserForm';
import { dashboardCreateUserService } from '@/src/services/dashboard/users/dashboardCreateUserService';

type CreateUserFormProps = {
  closeModal: () => void;
};

export default function CreateUserForm({ closeModal }: CreateUserFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserFormData>();
  
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateUserService,
    invalidateQuery: ['users'],
    onSuccessCallback: closeModal,
    message: 'Usuario registrado exitosamente'
  })

  const onSubmit = (data: UserFormData) => mutate({...data, activo: true});

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <UserForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Registrar Usuario</Button>
      </div>
    </form>
  );
}
