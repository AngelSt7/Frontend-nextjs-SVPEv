import { z } from "zod";

export const SalesFormDataSchema = z.object({
    id_cliente: z.number().int().min(1),
    id_usuario: z.number().int().min(1),
    id_metodo_pago: z.number().int().min(1)
});

export const DetailSaleSchema = z.object({
  id: z.number().int(),
  nombreProducto: z.string(),
  cantidad: z.number().int(),
  precioUnitario: z.number(),
  total: z.number(),
  fechaCreacion: z.coerce.date(),
  activo: z.union([z.literal(0), z.literal(1)])
});

// Schema principal de venta
export const DashboardSaleSchema = z.object({
  id: z.number().int(),
  uuui: z.string().optional().nullish(),
  fecha: z.coerce.date(),
  subtotal: z.number(),
  igv_total: z.number(),
  descuento: z.number(),
  total: z.number().nullish(),
  cancelado: z.boolean(),
  activo: z.number().int().min(0).max(1),
  nombreUsuario: z.string().email(),
  nombreCliente: z.string(),
  nombreMetodoPago: z.string(),
  codigoCupon: z.string().nullable(),
  detallesVenta: z.array(DetailSaleSchema)
});

export const DashboardSalesSchema = z.array(DashboardSaleSchema);