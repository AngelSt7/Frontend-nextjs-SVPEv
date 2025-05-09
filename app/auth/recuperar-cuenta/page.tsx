'use client'

import ContentAuth  from '@/src/components/auth/ui/ContentAuth'
import ForgotPasswordForm from '@/src/components/auth/ForgotPasswordForm'

export default function page() {
    return (
        <>
            <ContentAuth tittle='NEÓN' message='Escribe tu correo de usuario para recuperar tu acceso de forma rápida y segura.'  window='Recuperar acceso'>
                <ForgotPasswordForm />
            </ContentAuth>
        </>
    )
}
