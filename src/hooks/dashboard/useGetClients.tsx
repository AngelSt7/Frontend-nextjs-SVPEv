import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListClientsService } from '@/src/services/dashboard/clients/dashboardListClientsService';

export const useGetClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: dashboardListClientsService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
