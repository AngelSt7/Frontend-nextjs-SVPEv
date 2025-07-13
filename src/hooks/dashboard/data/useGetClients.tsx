import { Client } from '@/src/services/dashboard/client/Client';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: Client.list,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
