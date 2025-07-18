import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Descripción", uid: "descripcion", sortable: true },
  { name: "Precio Venta", uid: "precio_venta", sortable: true },
  { name: "SKU", uid: "sku" },
  { name: "Stock Mínimo", uid: "min_stock", sortable: true },
  { name: "Stock Máximo", uid: "max_stock", sortable: true },
  { name: "Stock Actual", uid: "stock_actual", sortable: true },
  { name: "Garantía (meses)", uid: "garantia_meses" },
  { name: "Categoría", uid: "nombre_categoria", sortable: true },
  { name: "Marca", uid: "nombre_marca", sortable: true },
  { name: "Activo", uid: "activo" },
  { name: "Acciones", uid: "actions" },
];


export const ColumnsSelectStock: ColumnsType = [
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "Precio Venta", uid: "precio_venta", sortable: true },
  { name: "Stock Mínimo", uid: "min_stock", sortable: true },
  { name: "Stock Máximo", uid: "max_stock", sortable: true },
  { name: "Seleccionar", uid: "seleccionar" },
];

