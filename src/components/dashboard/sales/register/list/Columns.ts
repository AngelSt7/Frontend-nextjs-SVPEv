import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Descripción", uid: "descripcion", sortable: true },
  { name: "Precio de Venta", uid: "precio_venta", sortable: true },
  { name: "Stock Mínimo", uid: "min_stock", sortable: true },
  { name: "Stock Actual", uid: "stock_actual", sortable: true },
  { name: "Garantía (Meses)", uid: "garantia_meses", sortable: true },
  { name: "Categoría", uid: "nombre_categoria", sortable: true },
  { name: "Marca", uid: "nombre_marca", sortable: true },
  { name: "Acciones", uid: "actions" },
];
