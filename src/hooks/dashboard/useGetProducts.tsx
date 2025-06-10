import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListProductService } from '@/src/services/dashboard/product/dashboardListProductService';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: dashboardListProductService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
