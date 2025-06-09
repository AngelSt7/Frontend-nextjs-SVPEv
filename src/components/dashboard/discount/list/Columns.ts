import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Categoría", uid: "categoria", sortable: true },
  { name: "Descuento (%)", uid: "descuento", sortable: true },
  { name: "Fecha de Inicio", uid: "fecha_inicio", sortable: true },
  { name: "Fecha Final", uid: "fecha_final", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" }
];
