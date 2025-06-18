import {
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatDate } from "@/src/utils/format/formatDate";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardWarrantyClaim } from "@/src/types/dashboard/WarrantyClaimTypes";

export const RenderCellWarrantyClaim = (
  mutate: mutateProps,
  item: DashboardWarrantyClaim,
  columnKey: React.Key,
  openModalEdit?: (id: number) => void
) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {
    case "fecha_reclamo":
      return <p>{formatDate(item.fecha_reclamo)}</p>;

    case "estado":
      const statusText = item.estado === "ACTIVO" || item.activo === 1 ? "activo" : "inactivo";
      return (
        <Chip
          className="capitalize cursor-pointer select-none"
          color={statusColorMap[statusText]}
          size="sm"
          variant="flat"
          onDoubleClick={() => mutate({ id: item.id, activo: item.activo })}
          role="button"
          tabIndex={0}
        >
          {statusText}
        </Chip>
      );

    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu disabledKeys={item.activo === 0 ? ["edit", "delete"] : []}>
              <DropdownItem key="edit" onPress={() => openModalEdit?.(item.id_reclamo_garantia)}>
                Editar
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => {
                  ToastDelete({
                    message: "¿Desea eliminar el reclamo de garantia",
                    name: item.descripcion,
                    onConfirm: () => mutate({ id: item.id, activo: 1 }),
                  });
                }}
              >
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );

    default:
      return cellValue;
  }
};
