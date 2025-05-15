import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import UserForm from '../form/UserForm';
import { DashboardUserById, UserFormData } from '@/src/types/UserTypes';
import { dashboardUpdateUserService } from '@/src/services/dashboard/users/dashboardUpdateUserService';

type EditUserForm = {
    user?: AuthUserInfo;
    closeModal: () => void;
    defaultValues: DashboardUserById
};

export default function EditUserForm({ user, closeModal, defaultValues }: EditUserForm) {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<UserFormData>({
        defaultValues: { ...defaultValues,
            activo: defaultValues.activo === 1, dni: defaultValues.dni, celular: defaultValues.celular,
            id_rol: 1, estado: 1
        }
    });

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardUpdateUserService,
        invalidateQuery: [
            ["users"],
            ["user", defaultValues.id.toString()]
        ],
        onSuccessCallback: closeModal,
        message: 'Usuario actualizado exitosamente'
    })

    const onSubmit = (data: UserFormData) => mutate(data);

    return (
        <form
            noValidate
            className="flex flex-col justify-between gap-3 flex-1 mt-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <UserForm register={register} errors={errors} watch={watch} setValue={setValue} />
            <div className="w-full flex gap-4 justify-end mt-3">
                <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
                <Button color='success' type='submit'>Actualizar Usuario</Button>
            </div>
        </form>
    );
}
