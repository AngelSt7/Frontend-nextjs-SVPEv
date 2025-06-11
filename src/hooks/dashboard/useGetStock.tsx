import { dashboardListStockService } from '@/src/services/dashboard/stock/dashboardListStockService';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetStock = () => {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: dashboardListStockService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
