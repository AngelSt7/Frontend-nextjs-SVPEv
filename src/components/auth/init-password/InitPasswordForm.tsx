'use client'

import Input from '@/src/components/ui/Input';
import { useAuthMutation } from '@/src/hooks/auth/useAuthMutation';
import { authInitPasswordService } from '@/src/services/auth/authInitPasswordService';
import { useAppStore } from '@/src/store/useAppStore';
import { AuthInitPassword } from '@/src/types/AuthTypes';
import { useForm } from 'react-hook-form';
import { MdLockOutline } from 'react-icons/md';

type InitPasswordFormProps = {
    shouldShowResetPasswordModal: boolean;
    toggleResetPasswordModal: () => void;
};

export default function InitPasswordForm({ shouldShowResetPasswordModal, toggleResetPasswordModal }: InitPasswordFormProps) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<AuthInitPassword>();
    const { mutate } = useAuthMutation({
        onSuccessCallback: toggleResetPasswordModal,
        serviceFunction: authInitPasswordService,
    });
    const claveNueva = watch('clave_nueva');
    const repeatClaveNueva = watch('repeat_clave_nueva');
    const onSubmit = (data: AuthInitPassword) => mutate({ formData: data, shouldShowResetPasswordModal, toggleResetPasswordModal });

    return (
        <form className='flex flex-col justify-between gap-3 flex-1 py-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3'>
                <Input
                    type='password' placeholder='Tu clave actual' htmlFor='clave_actual' label='Clave actual'
                    Icon={MdLockOutline}
                    register={register('clave_actual', {
                        required: 'Este campo es obligatorio',
                    })}
                    errorMessage={errors.clave_actual}
                />
                <Input
                    type='password'
                    placeholder='Nueva contraseña'
                    htmlFor='clave_nueva'
                    label='Nueva clave'
                    Icon={MdLockOutline}
                    register={register('clave_nueva', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres'
                        },
                        maxLength: {
                            value: 20,
                            message: 'La contraseña no debe exceder los 20 caracteres'
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/,
                            message:
                                'Debe incluir al menos una mayúscula, un número y un símbolo especial',
                        },
                    })}
                    errorMessage={errors.clave_nueva}
                />

                <Input
                    type='password' placeholder='Repite nueva contraseña' htmlFor='repeat_clave_nueva' label='Repite la nueva clave'
                    Icon={MdLockOutline}
                    register={register('repeat_clave_nueva', {
                        required: 'Este campo es obligatorio',
                        validate: value => value === claveNueva || 'Las contraseñas no coinciden',
                    })}
                    errorMessage={errors.repeat_clave_nueva}
                />
            </div>
            <div className='w-full'>
                <button type='submit' className='w-full mt-5 h-12 font-bold bg-blue-700 text-white p-1 rounded-md hover:bg-blue-800 transition-transform duration-200 ease-in-out hover:scale-105'>
                    Cambiar contraseña
                </button>
            </div>
        </form>
    );
}
