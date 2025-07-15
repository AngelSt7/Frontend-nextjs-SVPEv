import { dashboardListProductService } from '@/src/services/dashboard/sales/register/dashboardListProductSaleService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: dashboardListProductService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
