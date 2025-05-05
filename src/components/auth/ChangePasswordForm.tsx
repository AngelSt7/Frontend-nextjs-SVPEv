'use client'

import Input from '@/src/components/ui/Input';
import { useAuthMutation } from '@/src/hooks/auth/useAuthMutation';
import { AuthChangePasswordService } from '@/src/services/auth/AuthChangePasswordService';
import { AuthChangePassword } from '@/src/types/AuthTypes';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { MdLockOutline } from 'react-icons/md';

export default function ChangePasswordForm() {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<AuthChangePassword>();
    const { mutate } = useAuthMutation({
        onSuccessCallback: () => reset(),
        serviceFunction: AuthChangePasswordService,
        redirection: '/auth/iniciar-sesion'
    })
    const onSubmit = (data: AuthChangePassword) => mutate(data)
    const password = watch('password');

    return (
        <form className='flex flex-col justify-between mt-6 gap-3 flex-1 py-5'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3'>
                <Input
                    type='password'
                    placeholder='Nueva contraseña'
                    htmlFor='password'
                    label='Nueva contraseña'
                    Icon={MdLockOutline}
                    register={register('password', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres',
                        }
                    })}
                    errorMessage={errors.password}
                />
                <Input
                    type='password'
                    placeholder='Repetir contraseña'
                    htmlFor='repeatPassword'
                    label='Repetir contraseña'
                    Icon={MdLockOutline}
                    register={register('repeatPassword', {
                        required: 'Este campo es obligatorio',
                        validate: value => value === password || 'Las contraseñas no coinciden',
                        minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres',
                        }
                    })}
                    errorMessage={errors.repeatPassword}
                />
            </div>
            <div className='w-full'>
                <button
                    type='submit'
                    className='w-full mt-5 h-12 font-bold bg-orange-600 text-white p-1 rounded-md hover:bg-orange-500 transition-transform duration-200 ease-in-out hover:scale-105'>
                    Cambiar Contraseña
                </button>
                <p className='text-center text-zinc-900 mt-4 text-sm'>
                    ¿Tu cuenta está activa?{' '}
                    <Link href={'/auth/login'} prefetch={true} className='font-bold'>Inicia Sesión</Link>
                </p>
            </div>
        </form>
    )
}
