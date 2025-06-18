import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListSerieProductService } from '@/src/services/dashboard/serieProduct/dashboardListSerieProductService';

export const useGetSeriesProducts = () => {
  return useQuery({
    queryKey: ['seriesProducts'],
    queryFn: dashboardListSerieProductService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
