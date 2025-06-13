import api from "@/src/axios/axios";
import { WarrantyFormData } from "@/src/types/dashboard/WarrantyTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateWarrantyService(formData: WarrantyFormData) {
  try {
    const url = "/garantia/registrar";

    const payload = {
      ...formData
    };

    const { data } = await api.post(url, payload);

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.error);
    } else {
      throw new Error("Error inesperado al conectar con el servicio.");
    }
  }
}
