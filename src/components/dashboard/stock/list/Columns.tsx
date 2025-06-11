import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Proveedor", uid: "proveedor", sortable: true },
  { name: "Producto", uid: "producto", sortable: true },
  { name: "Lote", uid: "lote", sortable: true },
  { name: "Tipo de Documento", uid: "tipo_documento", sortable: true },
  { name: "N° Documento", uid: "numero_documento", sortable: true },
  { name: "Observaciones", uid: "observaciones", sortable: false },
  { name: "Estado de registro", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" },
];
