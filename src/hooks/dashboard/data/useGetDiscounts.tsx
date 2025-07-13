import { Discount } from '@/src/services/dashboard/discount/Discount';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetDiscounts = () => {
    const { data } = useQuery({
    queryKey: ['discounts'],
    queryFn: Discount.list,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  if(data) return data
};
