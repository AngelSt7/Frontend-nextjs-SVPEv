import { Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatDate } from "@/src/utils/format/formatDate";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardReturnProduct } from "@/src/types/dashboard/ReturnProductTypes";

export const RenderCellReturn = (
  mutate: mutateProps,
  item: DashboardReturnProduct, columnKey: React.Key,
  openModalEdit?: (id: number) => void
) => {

  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "precio_venta":
      return (
        <p>{formatDate(item.fecha_devolucion)}</p>
      )

    case "estado":
      const statusText = item.estado === 1 ? "activo" : "inactivo";
      return (
        <Chip
          className="capitalize cursor-pointer select-none"
          color={statusColorMap[statusText]}
          size="sm"
          variant="flat"
          onDoubleClick={() => mutate({ id: item.id, activo: item.estado })}
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
            <DropdownMenu disabledKeys={item.estado === 0 ? ["edit", "delete"] : []}>
              <DropdownItem key="edit" onPress={() => openModalEdit(item.id_devolucion_producto)}>Editar</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    name: item.codigo_lote,
                    onConfirm: () => mutate({ id: item.id, activo: 1 }),
                  })
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
