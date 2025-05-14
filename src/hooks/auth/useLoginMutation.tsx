import { authLoginService } from '@/src/services/auth/authLoginService'
import { useAppStore } from '@/src/store/useAppStore'
import { AuthLogin } from '@/src/types/AuthTypes'
import { setJWT } from '@/src/utils/resolves/token'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { UseFormReset } from 'react-hook-form'
import toast from 'react-hot-toast'

type LoginMutation<T> = {
  onSuccessCallback: UseFormReset<AuthLogin>
}

export function useLoginMutation({ onSuccessCallback }: LoginMutation<AuthLogin>) {
    const shouldShowResetPasswordModal = useAppStore(state => state.shouldShowResetPasswordModal)
    const toggleResetPasswordModal = useAppStore(state => state.toggleResetPasswordModal)
    const router = useRouter()
    const mutation = useMutation({
        mutationFn: authLoginService,
        onError: (error) => toast.error(error.message || 'Error inesperado'),
        onSuccess: async (data) => {
            onSuccessCallback()
            if(data.clave_cambiada === false) {
                localStorage.setItem('AUTH_TOKEN', data.token)
                if(!shouldShowResetPasswordModal){ toggleResetPasswordModal() }
            } else {
                if(shouldShowResetPasswordModal){ toggleResetPasswordModal() }
                await setJWT(data.token)
                toast.success('Inicio de sesión exitoso')
                router.replace('/dashboard/proveedores')
            }
        },
    })
    return mutation
}
