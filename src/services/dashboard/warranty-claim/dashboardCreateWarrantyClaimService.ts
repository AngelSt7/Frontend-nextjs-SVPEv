import api from "@/src/axios/axios";
import { WarrantyClaimFormData } from "@/src/types/dashboard/WarrantyClaimTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateWarrantyClaimService(formData: WarrantyClaimFormData) {
  try {
    const url = "/reclamo-garantia/registrar";

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
