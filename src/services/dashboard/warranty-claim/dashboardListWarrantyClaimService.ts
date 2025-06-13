import api from "@/src/axios/axios";
import { DashboardWarrantyClaimsSchema } from "@/src/schemas/dashboard/Warranty-claim";
import { isAxiosError } from "axios";

export async function dashboardListWarrantyClaimsService() {
  try {
    const url = '/reclamo-garantia/listar';
    const { data } = await api.get(url);
    const response = DashboardWarrantyClaimsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
