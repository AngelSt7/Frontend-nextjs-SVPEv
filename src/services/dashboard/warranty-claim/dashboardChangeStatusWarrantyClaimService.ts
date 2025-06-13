import api from "@/src/axios/axios";
import { DashboardWarrantyClaim } from "@/src/types/dashboard/WarrantyClaimTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type DashboardChangeStatusWarrantyClaimServiceProps = {
  id: DashboardWarrantyClaim["id"];
  activo: DashboardWarrantyClaim["activo"];
};

export async function dashboardChangeStatusWarrantyClaimService(
  formdata: DashboardChangeStatusWarrantyClaimServiceProps
) {
  try {
    const selected = actions[formdata.activo];
    const url = `/reclamo-garantia/${selected.action}/${formdata.id}`;
    const { data } = await api.put(url);
    return data.mensaje;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
