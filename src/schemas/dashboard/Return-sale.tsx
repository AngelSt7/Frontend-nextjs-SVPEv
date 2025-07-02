import { z } from "zod";

export const DetalleDevolucionSchema = z.object({
  id_producto: z.number(),
  nombreProducto: z.string(),
  cantidad: z.number(),
});

export const DashboardReturnSaleSchema = z.object({
    id: z.number(),
    id_venta: z.number(),
    fecha: z.string(),
    motivo: z.string(),
    estado: z.string(),
    usuario: z.object({
      correo: z.string(),
      nombre_rol: z.string(),
      nombre_empleado: z.string(),
    }),
    detalles: z.array(DetalleDevolucionSchema),
})

export const ReturnSaleFormDataSchema = z.object({
  id_registro_venta: z.number(),
  devolucion: z.array(z.object({
    id_producto: z.number(),
    cantidad: z.number(),
  })),
  motivo: z.string(),
  id_usuario: z.number(),
});


export const DashboardReturnSaleByIdSchema = z.object({
    id: z.number(),
    id_venta: z.number(),
    motivo: z.string(),
    estado: z.string(),
    detalles: z.array(DetalleDevolucionSchema),
});

export const DashboardReturnsSalesSchema = z.array(DashboardReturnSaleSchema);