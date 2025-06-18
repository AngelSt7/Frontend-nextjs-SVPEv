import { DashboardSaleSchema, SalesFormDataSchema } from "@/src/schemas/dashboard/Sales"
import { z } from "zod"

export type ResponseSale = {
    id: number;
    fecha: Date;
    igv_porcentaje: number;
    subtotal: number;
    igv_total: number;
    descuento: number;
    total: number;
    cancelado: boolean;
    activo: number;
    id_usuario: number;
    nombreUsuario: string;
    id_cliente: number;
    nombreCliente: string;
    id_metodo_pago: number;
    nombreMetodoPago: string;
    id_cupon: null;
    codigoCupon: null;
    detallesVenta: null;
}

export type Discount = {
    nombreCategoria: string,
    porcentaje: number,
}

export type Product = {
    id: number,
    nombre: string,
    precio_venta: number,
    min_stock: number,
    stock_actual: number,
    nombre_categoria: string,
    nombre_marca: string,
}

export type ProductCart = Product & {
    cantidad: number,
    subtotal: number,
    descuento: number,
    precio_base: number;
    precio_descuento: number;
    igv_unitario: number;
    igv: number
}

export type SalesFormData = z.infer<typeof SalesFormDataSchema>
export type DashboardSale = z.infer<typeof DashboardSaleSchema>