import { dashboardListWarrantyClaimsService } from "@/src/services/dashboard/warranty-claim/dashboardListWarrantyClaimService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export const useGetWarranties = () => {
  return useQuery({
    queryKey: ['warranties'],
    queryFn: dashboardListWarrantyClaimsService,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });
};