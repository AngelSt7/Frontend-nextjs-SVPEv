import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Proveedor", uid: "proveedor", sortable: true },
  { name: "Producto", uid: "producto", sortable: true },
  { name: "Lote", uid: "lote", sortable: true },
  { name: "Cantidad", uid: "cantidad", sortable: true },
  { name: "Fecha de Ingreso", uid: "fecha_ingreso", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" },
];
