import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { dashboardListLevelCategoryService } from '@/src/services/dashboard/category/dashboardListLevelCategoryService';

export const useGetLevelCategories = ({ level } : { level: number}) => {
  return useQuery({
    queryKey: ['categories-level', level.toString()],
    queryFn: () => dashboardListLevelCategoryService({level}),
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
