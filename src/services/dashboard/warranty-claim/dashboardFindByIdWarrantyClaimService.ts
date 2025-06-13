import api from "@/src/axios/axios";
import { isAxiosError } from "axios";
import { DashboardWarrantyClaimByIdSchema } from '@/src/schemas/dashboard/Warranty-claim';

export async function dashboardFindByIdWarrantyClaimService(id: number) {
  try {
    const url = `/reclamo-garantia/buscar/${id}`;
    const { data } = await api.get(url);
    const response = DashboardWarrantyClaimByIdSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
