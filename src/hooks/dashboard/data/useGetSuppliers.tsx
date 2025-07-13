import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Supplier } from '@/src/services/dashboard/supplier/Supplier';

export const useGetSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: Supplier.list,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
