import { dashboardListClientService } from '@/src/services/dashboard/client/dashboardListClientService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: dashboardListClientService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
