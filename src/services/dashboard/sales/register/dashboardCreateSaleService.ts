import api from "@/src/axios/axios";
import { ProductCart, SalesFormData } from "@/src/types/dashboard/SaleTypes";
import { isAxiosError } from "axios";

type CreateSaleServiceTyoe = {
    cart: ProductCart[],
    formData: SalesFormData
}

export async function dashboardCreateSaleService({ cart, formData }: CreateSaleServiceTyoe) {
    const cartItems = cart.map(item => ({
        id_producto: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_venta
    }))
    try {
        const url = '/venta/registrar'
        const { data } = await api.post(url, {
            ...formData,
            items: cartItems,
            cancelado: false
        })
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}