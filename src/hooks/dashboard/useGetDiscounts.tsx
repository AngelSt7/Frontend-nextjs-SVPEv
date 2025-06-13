import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListDiscountService } from '@/src/services/dashboard/discount/dashboardListDiscountService';

export const useGetDiscounts = () => {
    const { data, isLoading } = useQuery({
    queryKey: ['discounts'],
    queryFn: dashboardListDiscountService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  if(data) return data
};
