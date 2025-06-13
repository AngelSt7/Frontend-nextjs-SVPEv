import api from "@/src/axios/axios";
import { isAxiosError } from "axios";
import { WarrantyClaimFormData } from "@/src/types/dashboard/WarrantyClaimTypes";

export async function dashboardUpdateWarrantyClaimService(formData: WarrantyClaimFormData) {
  try {
    if (!formData.id_reclamo_garantia) {
      throw new Error("El campo 'id_reclamo_garantia' es obligatorio para actualizar un reclamo.");
    }

    const url = "/reclamo-garantia/actualizar";
    const { data } = await api.put(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al intentar actualizar el reclamo de garantía.");
    }
  }
}
