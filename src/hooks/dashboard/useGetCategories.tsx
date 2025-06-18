import { dashboardListCategoryService } from "@/src/services/dashboard/category/dashboardListCategoryService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: dashboardListCategoryService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};