'use client'

import ForgotPasswordForm from '@/src/components/Auth/ForgotPasswordForm';
import ContentAuth from '@/src/components/Auth/ui/ContentAuth';

export default function page() {
    return (
        <>
            <ContentAuth tittle='NEÓN' message='Escribe tu correo de usuario para recuperar tu acceso de forma rápida y segura.'  window='Recuperar acceso'>
                <ForgotPasswordForm />
            </ContentAuth>
        </>
    )
}
