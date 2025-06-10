import { ColumnsType } from "@/src/types/dashboard/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Categoría", uid: "nombreCategoria", sortable: true },
  { name: "Descuento (%)", uid: "porcentaje", sortable: true },
  { name: "Fecha de Inicio", uid: "fecha_inicio", sortable: true },
  { name: "Fecha Final", uid: "fecha_final", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" }
];
