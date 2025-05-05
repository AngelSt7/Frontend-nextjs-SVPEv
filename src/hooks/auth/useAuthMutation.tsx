import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { AuthChangePassword, AuthForgotPassword, AuthLogin } from '@/src/types/AuthTypes'
import { UseFormReset } from 'react-hook-form'

type AuthMutation<T> = {
  onSuccessCallback: UseFormReset<AuthLogin> | UseFormReset<AuthForgotPassword> | UseFormReset<AuthChangePassword>,
  serviceFunction: (data: T) => Promise<any>,
  redirection: string
}

export function useAuthMutation<T>({ onSuccessCallback, serviceFunction, redirection }: AuthMutation<T>) {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: serviceFunction,
    onError: (error) => toast.error(error.message || 'Error inesperado'),
    onSuccess: (data) => {
      toast.success(data || 'Operación exitosa')
      router.replace(redirection)
      onSuccessCallback()
    },
  })
  return mutation
}
