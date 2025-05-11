import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';

type useCreateMutationProps<T> = {
  serviceFunction: (data: T) => Promise<any>,
  onSuccessCallback: () => void,
  invalidateQuery: string
}

export default function useSubmitMutation<T>({ serviceFunction, invalidateQuery, onSuccessCallback } : useCreateMutationProps<T>) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: serviceFunction,
        onError: (error) => toast.error(error.message || 'Error inesperado'),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [invalidateQuery] });
            onSuccessCallback()
            toast.success('Proveedor creado exitosamente')
        }
    })
  return mutation
}
