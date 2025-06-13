import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Fecha", uid: "fecha", sortable: true },
  { name: "Subtotal", uid: "subtotal", sortable: true },
  { name: "IGV Total", uid: "igv_total", sortable: true },
  { name: "Descuento", uid: "descuento", sortable: true },
  { name: "Total", uid: "total", sortable: true },
  { name: "Cancelado", uid: "cancelado", sortable: true },
  { name: "Estado de registro", uid: "activo", sortable: true },
  { name: "Cliente", uid: "nombreCliente", sortable: true },
  { name: "Usuario", uid: "nombreUsuario", sortable: true },
  { name: "Método de Pago", uid: "nombreMetodoPago", sortable: true },
  { name: "Cupón", uid: "codigoCupon", sortable: true },
  { name: "Acciones", uid: "actions" }
];