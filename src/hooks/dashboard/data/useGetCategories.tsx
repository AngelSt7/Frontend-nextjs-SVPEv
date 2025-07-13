import { Category } from "@/src/services/dashboard/category/Category";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: Category.list,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};