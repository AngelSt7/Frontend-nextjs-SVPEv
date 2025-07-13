import { Stock } from '@/src/services/dashboard/stock/Stock';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useGetStock = () => {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: Stock.list,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
