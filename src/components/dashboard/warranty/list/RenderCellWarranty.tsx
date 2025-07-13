import {
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/feedback/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatDate } from "@/src/utils/format/formatDate";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardWarranty } from "@/src/types/dashboard/WarrantyTypes";

export const RenderCellWarranty = (
  mutate: mutateProps,
  item: DashboardWarranty,
  columnKey: React.Key,
  openModalEdit?: (id: number) => void
) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {
    case "inicioGarantia":
      return <p>{formatDate(item.inicioGarantia)}</p>;

    case "finGarantia":
      return <p>{formatDate(item.finGarantia)}</p>;

    case "activo":
      const statusText = item.activo === 1 ? "activo" : "inactivo";
      return (
        <Chip
          className="capitalize cursor-pointer select-none"
          color={statusColorMap[statusText]}
          size="sm"
          variant="flat"
          onDoubleClick={() => mutate({ id: item.id, status: item.activo })}
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
              <DropdownItem key="edit" onPress={() => openModalEdit?.(item.id)}>
                Editar
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => {
                  ToastDelete({
                    message: `¿Desea eliminar la garantia del producto`,
                    name: item.producto,
                    onConfirm: () => mutate({ id: item.id, status: 1 }),
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
