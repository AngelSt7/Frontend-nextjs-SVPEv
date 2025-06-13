import { ColumnsType } from "@/src/types/commonTypes/commonTypes";

export const Columns: ColumnsType = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Inicio Garantía", uid: "inicio_garantia", sortable: true },
  { name: "Fin Garantía", uid: "final_garantia", sortable: true },
  { name: "Descripción", uid: "descripcion", sortable: true },
  { name: "Estado", uid: "estado", sortable: true },
  { name: "Fecha de Reclamo", uid: "fecha_reclamo", sortable: true },
  { name: "Activo", uid: "activo", sortable: true },
  { name: "Acciones", uid: "actions" }
];
