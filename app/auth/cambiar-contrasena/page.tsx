import ChangePasswordForm from '@/src/components/auth/change-password/ChangePasswordForm'
import ContentAuth from '@/src/components/auth/ui/ContentAuth'

export default function page() {
    return (
        <ContentAuth tittle='NEÓN' message='Registra una nueva contraseña y accede a Neón' window='Recuperar acceso'>
            <ChangePasswordForm />
        </ContentAuth>
    )
}
