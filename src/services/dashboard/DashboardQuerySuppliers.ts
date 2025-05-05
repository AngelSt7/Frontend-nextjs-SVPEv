import api from "@/src/axios/axios";
import { DashboardSuppliersSchema } from "@/src/schemas/dashboard/Suppliers";
import { DashboardPaginationType } from "@/src/types/DashboardTypes";
import { isAxiosError } from "axios";

type DashboardQuerySuppliersType = {
    take: DashboardPaginationType['take']
    page: DashboardPaginationType['page']
    search: string
}

export async function DashboardQuerySuppliers(formData: DashboardQuerySuppliersType) {
    try {
        const skip = ( formData.page - 1 ) * formData.take

        const url = '/proveedores/'
        const { data } = await api.get(url)
        const response = DashboardSuppliersSchema.safeParse(data)
        if (response.success) {
            return response.data
        } else {
            console.log(response.error.format())
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}