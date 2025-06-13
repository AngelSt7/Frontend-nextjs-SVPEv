import api from "@/src/axios/axios";
import { isAxiosError } from "axios";
import { DashboardWarrantyByIdSchema } from "@/src/schemas/dashboard/Warranty";

export async function dashboardFindByIdWarrantyService(id: number) {
  try {
    const url = `/garantia/buscar/${id}`;
    const { data } = await api.get(url);
    const response = DashboardWarrantyByIdSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
