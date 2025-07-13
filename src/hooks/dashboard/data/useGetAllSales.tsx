import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { dashboardListSaleService } from "@/src/services/dashboard/sales/dashboardListSaleService";

export const useGetAllSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: dashboardListSaleService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};
