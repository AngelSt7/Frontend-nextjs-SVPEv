import api from "@/src/axios/axios";
import { isAxiosError } from "axios";
import { WarrantyFormData } from "@/src/types/dashboard/WarrantyTypes";

export async function dashboardUpdateWarrantyService(formData: WarrantyFormData) {
  try {
    if (!formData.id_garantia) {
      throw new Error("El campo 'id_garantia' es obligatorio para actualizar una garantía.");
    }

    const url = "/garantia/actualizar";
    const { data } = await api.put(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al intentar actualizar la garantía.");
    }
  }
}
