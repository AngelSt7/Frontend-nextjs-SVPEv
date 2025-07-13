import { DashboardUserById, UserFormData } from '@/src/types/dashboard/UserTypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import UserForm from '../form/UserForm';
import { User } from '@/src/services/dashboard/users/User';
import { normalizeUser } from '@/src/utils/normalize/normalizeUser';

type EditUserForm = {
    user?: AuthUserInfo;
    closeModal: () => void;
    defaultValues: DashboardUserById
};

export default function EditUserForm({ user, closeModal, defaultValues }: EditUserForm) {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<UserFormData>({
        defaultValues: normalizeUser(defaultValues)
    });

    const { mutate } = useSubmitMutation({
        serviceFunction: User.update,
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
