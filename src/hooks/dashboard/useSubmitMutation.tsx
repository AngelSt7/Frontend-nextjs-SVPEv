import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';

type QueryKey = readonly unknown[]

type useCreateMutationProps<T> = {
  serviceFunction: (data: T) => Promise<any>,
  onSuccessCallback?: () => void,
  invalidateQuery: QueryKey | QueryKey[],
  message?: string
}

export default function useSubmitMutation<T>({ serviceFunction, invalidateQuery, onSuccessCallback, message }: useCreateMutationProps<T>) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: serviceFunction,
    onError: (error) => toast.error(error.message || 'Error inesperado'),
    onSuccess: (data) => {
      const queriesToInvalidate = Array.isArray(invalidateQuery[0]) ? invalidateQuery : [invalidateQuery]
      queriesToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key as QueryKey | QueryKey[]})
      })
      onSuccessCallback?.()
      toast.success(message ?? data)
    },
  })
  return mutation
}
