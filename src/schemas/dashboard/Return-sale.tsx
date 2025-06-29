import { z } from "zod";

export const DashboardReturnSaleSchema = z
  .object({
    id: z.number(),
    fecha: z.string(),
    cantidad: z.number(),
    motivo: z.string(),
    usuarios: z
      .array(
        z.object({
          correo: z.string(),
        })
      )
      .transform((arr) => arr[0]?.correo ?? null),
    detallesVenta: z
      .array(
        z.object({
          id: z.number(),
          nombreProducto: z.string(),
        })
      )
      .transform((arr) => arr[0]?.nombreProducto ?? null),
  })
  .transform(({ usuarios, detallesVenta, ...rest }) => ({
    ...rest,
    correo: usuarios,
    producto: detallesVenta,
  }));


export const ReturnSaleFormDataSchema = z.object({
  id_detalle_venta: z.number(),
  productos: z.array(
    z.object({
      cantidad: z.number().min(0),
    })
  ),
  motivo: z.string(),
  id_usuario: z.number(),
});


export const DashboardReturnSaleByIdSchema = z.object({
  id: z.number(),
  totalVenta: z.number(),
  fecha: z.string(),
  cantidad: z.number(),
  motivo: z.string().optional(),
  correoUsuario: z.string()
});

export const DashboardReturnsSalesSchema = z.array(DashboardReturnSaleSchema);