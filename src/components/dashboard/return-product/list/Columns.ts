import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Código de Lote", uid: "codigo_lote", sortable: true },
  { name: "Cantidad", uid: "cantidad", sortable: true },
  { name: "Fecha de Devolución", uid: "fecha_devolucion", sortable: true },
  { name: "Motivo", uid: "motivo", sortable: true },
  { name: "Observaciones", uid: "observaciones", sortable: true },
  { name: "Reposición Aplicada", uid: "reposicion_aplicada", sortable: true },
  { name: "Estado", uid: "estado", sortable: true },
  { name: "Acciones", uid: "actions" },
];