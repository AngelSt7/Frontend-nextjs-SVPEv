import api from "@/src/axios/axios";
import { DashboardWarranty } from "@/src/types/dashboard/WarrantyTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type DashboardChangeStatusWarrantyServiceProps = {
  id: DashboardWarranty["id"];
  activo: DashboardWarranty["activo"];
};

export async function dashboardChangeStatusWarrantyService(
  formdata: DashboardChangeStatusWarrantyServiceProps
) {
  try {
    const selected = actions[formdata.activo];
    const url = `/garantia/${selected.action}/${formdata.id}`;
    const { data } = await api.put(url);
    return data.mensaje;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
