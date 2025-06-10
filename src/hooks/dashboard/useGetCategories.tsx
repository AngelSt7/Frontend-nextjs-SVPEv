import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListCategoryService } from '@/src/services/dashboard/category/dashboardListCategoryService';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: dashboardListCategoryService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
