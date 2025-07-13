import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Category } from '@/src/services/dashboard/category/Category';

export const useGetLevelCategories = ({ level } : { level: number}) => {
  return useQuery({
    queryKey: ['categories-level', level.toString()],
    queryFn: () => Category.listLevel({level}),
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
