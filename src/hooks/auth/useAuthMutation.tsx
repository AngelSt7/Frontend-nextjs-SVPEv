import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AuthChangePassword, AuthForgotPassword, AuthLogin } from '@/src/types/AuthTypes'
import { UseFormReset } from 'react-hook-form'

type AuthMutation<T> = {
  onSuccessCallback: UseFormReset<AuthLogin> | UseFormReset<AuthForgotPassword> | UseFormReset<AuthChangePassword>,
  serviceFunction: (data: T) => Promise<any>,
  redirection: string,
  extraCallback?: (data : string) => void
}

export function useAuthMutation<T>({ onSuccessCallback, serviceFunction, redirection, extraCallback }: AuthMutation<T>) {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: serviceFunction,
    onError: (error) => toast.error(error.message || 'Error inesperado'),
    onSuccess: (data) => {
      {extraCallback && extraCallback(data.token)}
      toast.success('Inicio de sesión exitoso')
      onSuccessCallback()
      router.replace(redirection)
    },
  })
  return mutation
}
