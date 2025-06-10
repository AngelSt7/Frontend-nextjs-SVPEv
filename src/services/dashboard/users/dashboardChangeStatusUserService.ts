import api from "@/src/axios/axios";
import { DashboardProduct, ProductFormData } from "@/src/types/dashboard/ProductTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusProductService = {
    id: DashboardProduct["id"];
    activo: ProductFormData["activo"];
};

export async function dashboardChangeStatusUserService(formdata: ChangeStatusProductService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/empleado/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
