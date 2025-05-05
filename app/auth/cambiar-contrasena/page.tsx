import React from 'react'
import ContentAuth from '@/src/components/Auth/ui/ContentAuth'
import ChangePasswordForm from '@/src/components/Auth/ChangePasswordForm'

export default function page() {
    return (
        <ContentAuth tittle='NEÓN' message='Registra una nueva contraseña y accede a Neón' window='Recuperar acceso'>
            <ChangePasswordForm />
        </ContentAuth>
    )
}
