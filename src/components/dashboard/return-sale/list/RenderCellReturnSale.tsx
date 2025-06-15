import { Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatDate } from "@/src/utils/format/formatDate";
import { DashboardReturnSale } from "@/src/types/dashboard/ReturnSaleTypes";
import { useModalUtils } from "@/src/hooks/modal/useModalUtils";
import { useAppStore } from "@/src/store/useAppStore";

export const RenderCellReturnSale = (
  mutate: mutateProps,
  item: DashboardReturnSale, columnKey: React.Key
) => {
  const setIdReturnSaleDetail = useAppStore(state => state.setIdReturnSaleDetail)
  const { openModalCreate, openModalEdit } = useModalUtils()
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "precio_venta":
      return (
        <p>{formatDate(item.fecha)}</p>
      )

    case "activo":
      const statusText = item.activo === 1 ? "activo" : "inactivo";
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
              <DropdownItem key="create" onPress={() => {
                openModalCreate(),
                  setIdReturnSaleDetail(item.id)
              }}>Crear</DropdownItem>
              <DropdownItem key="edit" onPress={() => openModalEdit(item.id)}>Editar</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    message: `¿Desea eliminar el motivo`,
                    name: item.motivo,
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
