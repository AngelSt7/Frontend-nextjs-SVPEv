import api from "@/src/axios/axios";
import { DashboardWarrantiesSchema } from "@/src/schemas/dashboard/Warranty";
import { isAxiosError } from "axios";

export async function dashboardListWarrantiesService() {
  try {
    const url = '/garantia/listar';
    const { data } = await api.get(url);
    const response = DashboardWarrantiesSchema.safeParse(data);
    if (response.success) {
      return response.data;
      
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
