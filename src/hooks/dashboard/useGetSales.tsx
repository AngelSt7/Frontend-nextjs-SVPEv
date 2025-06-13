import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { dashboardListWarrantiesService } from "@/src/services/dashboard/warranty/dashboardListWarrantyService";

export const useGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: dashboardListWarrantiesService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
