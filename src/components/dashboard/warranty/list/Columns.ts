import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Producto", uid: "producto", sortable: true },
  { name: "Cantidad", uid: "cantidad", sortable: true },
  { name: "Inicio Garantía", uid: "inicioGarantia", sortable: true },
  { name: "Fin Garantía", uid: "finGarantia", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" }
];
