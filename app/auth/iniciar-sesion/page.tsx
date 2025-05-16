import LoginForm from '@/src/components/auth/login/LoginForm'
import ContentAuth from '@/src/components/auth/ui/ContentAuth'

export default function page() {
  return (
    <ContentAuth tittle='NEÓN' message='Accede al panel de Neón usando tu correo electrónico y contraseña' window='Iniciar Sesión'>
      <LoginForm/>
    </ContentAuth>
  )
}
