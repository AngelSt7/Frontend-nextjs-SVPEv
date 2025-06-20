import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Nombre", uid: "nombre", sortable: true },
  { name: "DNI", uid: "dni", sortable: true },
  { name: "Celular", uid: "celular", sortable: true },
  { name: "Correo", uid: "correo", sortable: true },
  { name: "Estado de registro", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" }
];
