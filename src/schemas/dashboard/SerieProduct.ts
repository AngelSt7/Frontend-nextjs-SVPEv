import { z } from "zod";

// Schema para un solo objeto (singular)
export const DashboardSerieProductSchema = z.object({
  id_serie_producto: z.number(), //quiere esto
  id_detalle_ingreso: z.number(), //esto debo mandar, debe coincidir con el lote
  codigoLote: z.string(), //porsiacso
  numeroSerie: z.string() //SLECCIONALE
});

// Schema para el array de objetos (plural)
export const DashboardSeriesProductSchema = z.array(DashboardSerieProductSchema);
