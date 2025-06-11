import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Código de lote", uid: "codigo_lote", sortable: true },
  { name: "Cantidad", uid: "cantidad", sortable: true },
  { name: "Fecha de devolución", uid: "fecha_devolucion", sortable: true },
  { name: "Motivo", uid: "motivo", sortable: true },
  { name: "Observaciones", uid: "observaciones" },
  { name: "Reposición aplicada", uid: "reposicion_aplicada" },
  { name: "Estado", uid: "estado" },
  { name: "Acciones", uid: "actions" },
];
