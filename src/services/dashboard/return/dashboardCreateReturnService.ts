import api from "@/src/axios/axios";
import { ReturnProductFormData } from "@/src/types/dashboard/ReturnProductTypes";
import { isAxiosError } from "axios";

export async function dashboardCreateReturnProductService(formData: ReturnProductFormData) {
  try {
    const url = "/devolucion-producto/registrar";

    const payload = {
      ...formData,
      tipo_serie: formData.tipo_serie === "SERIE" ? "CON_SERIE" : "SIN_SERIE",
      ...(formData.series && formData.series.length > 0 ? { series: formData.series } : {}),
      reposicionAplicada: formData.reposicionAplicada ? 1 : 0,
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
