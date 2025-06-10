import api from "@/src/axios/axios";
import { CategoryFormData, DashboardCategory } from "@/src/types/dashboard/CategoryTypes";
import { actions } from "@/src/utils/constants/constans";
import { isAxiosError } from "axios";

export type ChangeStatusCategoryService = {
    id: DashboardCategory["id"];
    activo: CategoryFormData["activo"];
};

export async function dashboardChangeStatusCategoryService(formdata: ChangeStatusCategoryService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/categoria/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
