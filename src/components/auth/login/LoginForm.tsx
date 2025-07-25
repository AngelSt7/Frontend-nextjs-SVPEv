'use client'

import { AuthLogin } from '@/src/types/AuthTypes';
import { useForm } from 'react-hook-form';
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from 'next/link';
import { useLoginMutation } from '@/src/hooks/auth/useLoginMutation';
import Input from '../../ui/Input';
import { useAppStore } from '@/src/store/useAppStore';
import { ModalResetPassword } from './ModalResetPassword';

export default function LoginForm() {
    const shouldShowResetPasswordModal = useAppStore(state => state.shouldShowResetPasswordModal)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthLogin>();
    const { mutate } = useLoginMutation({ onSuccessCallback: () => reset() })
    const onSubmit = (data: AuthLogin) => mutate(data)

    return (
        <>
            <form method='POST' className='flex flex-col justify-between mt-6 gap-3 flex-1 py-5'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-3'>
                    <Input
                        isLogin={true}
                        type='email' placeholder='Tu email' htmlFor='email' label='Correo electrónico'
                        Icon={MdOutlineMail}
                        register={register('correo', {
                            required: 'Este campo es obligatorio',
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'El formato del correo electrónico no es válido'
                            }
                        })}
                        errorMessage={errors.correo}
                    />
                    <Input
                        isLogin={true}
                        type='password' placeholder='Tu contraseña' htmlFor='password' label='Contraseña'
                        Icon={RiLockPasswordFill}
                        register={register('clave', {
                            required: 'Este campo es obligaotrio'
                        })}
                        errorMessage={errors.clave}
                    />
                </div>
                <div className='w-full'>
                    <button type='submit' className='text-base md:text-lg w-full mt-5 h-12 font-bold bg-orange-600 text-white p-1 rounded-md hover:bg-orange-500 transition-transform duration-200 ease-in-out hover:scale-105'>
                        Iniciar sesión
                    </button>
                    <p className=' text-center text-zinc-900 mt-4 text-sm'>
                        ¿Olvidaste tu contraseña? {' '}
                        <Link href={'/auth/recuperar-cuenta'} className='font-bold'>Recuperala ahora</Link>
                    </p>
                </div>
            </form>
            {shouldShowResetPasswordModal && <ModalResetPassword showModal={shouldShowResetPasswordModal} />}
        </>
    )
}