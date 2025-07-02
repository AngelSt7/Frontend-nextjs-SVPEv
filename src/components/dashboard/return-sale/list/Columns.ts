import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Correo Usuario", uid: "correo", sortable: true },
  { name: "Rol de usuario", uid: "nombre_rol", sortable: true },
  { name: "Nombre Empleado", uid: "nombre_empleado", sortable: true },
  { name: "Motivo", uid: "motivo", sortable: true },
  { name: "Fecha", uid: "fecha", sortable: true },
  { name: "Acciones", uid: "actions" }
];
