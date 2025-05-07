'use client'

import Input from '@/src/components/ui/Input';
import { useAuthMutation } from '@/src/hooks/auth/useAuthMutation';
import { authForgotPasswordService } from '@/src/services/auth/AuthForgotPasswordService';
import { AuthForgotPassword } from '@/src/types/AuthTypes';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { MdOutlineMail } from 'react-icons/md';

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthForgotPassword>();
    const { mutate } = useAuthMutation({
        onSuccessCallback: () => reset(),
        serviceFunction: authForgotPasswordService,
        redirection: '/auth/iniciar-sesion'
    })
    const onSubmit = (data: AuthForgotPassword) => mutate(data)

    return (
        <form className='flex flex-col justify-between mt-6 gap-3 flex-1 py-5'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3'>
                <Input
                    type='email' placeholder='Tu email' htmlFor='email' label='Correo electrónico'
                    Icon={MdOutlineMail}
                    register={register('email', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'El formato del correo electrónico no es válido'
                        }
                    })}
                    errorMessage={errors.email}
                />
            </div>
            <div className=' w-full'>
                <button type='submit' className='w-full mt-5 h-12 font-bold bg-orange-600 text-white p-1 rounded-md hover:bg-orange-500 transition-transform duration-200 ease-in-out hover:scale-105'>
                    Enviar Correo
                </button>
                <p className=' text-center text-zinc-900 mt-4 text-sm'>
                    ¿Tu cuenta está activa? {' '}
                    <Link href={'/auth/iniciar-sesion'} prefetch={true} className=' font-bold'>Inicia Sesión</Link>
                </p>
            </div>
        </form>
    )
}
