import api from "@/src/axios/axios";
import { DashboardSupplier, SupplierFormData } from "@/src/types/DashboardTypes";

import { isAxiosError } from "axios";

export type ChangeStatusSupplierService = {
    id: DashboardSupplier["id"];
    activo: SupplierFormData["activo"];
};

const actions: { [key: number]: { action: string } } = {
    1: { action: "desactivar"},
    0: { action: "activar"},
};

export async function dashboardChangeStatusSupplierService(formdata: ChangeStatusSupplierService) {
    try {
        const selected = actions[formdata.activo];
        const url = `/proveedores/${selected.action}/${formdata.id}`;
        const { data } = await api.put(url);
        return data.mensaje
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
