import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListSupplierService } from '@/src/services/dashboard/Supplier/dashboardListSupplierService';

export const useGetSuppliers = () => {
  return useQuery({
    queryKey: ['suppliers'],
    queryFn: dashboardListSupplierService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
