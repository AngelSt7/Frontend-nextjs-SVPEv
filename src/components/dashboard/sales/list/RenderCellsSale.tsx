import { Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardSale } from "@/src/types/dashboard/SaleTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { formatCurrency } from "@/src/utils/format/formatCurrency";

export const RenderCellSale = (
  mutate: mutateProps,
  item: DashboardSale,
  columnKey: React.Key,
  _openModalEdit?: (id: number) => void,
  openDetailsModal?: () => void,
  setDetails?: (detail: DashboardSale["detallesVenta"]) => void
) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "total": return (
      <p>{formatCurrency(item.total)}</p>
    )

    case "cancelado":
      const statusTextCancel = item.cancelado === true ? "activo" : "inactivo";
      return (
        <Chip
          className="capitalize cursor-pointer select-none"
          color={statusColorMap[statusTextCancel]}
          size="sm"
          variant="flat"
          role="button"
          tabIndex={0}
        >
          {item.cancelado === true ? "Cancelado" : "No Cancelado"}
        </Chip>

      );

    case "fecha":
      return (
        <p>{formatDate(item.fecha.toString())}</p>
      )

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
            <DropdownMenu disabledKeys={item.activo === 0 ? ["details", "delete"] : []}>
              <DropdownItem key="details" onPress={() => {
                openDetailsModal?.();
                setDetails?.(item.detallesVenta);
              }}>Ver detalle</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    message: "¿Desea eliminar Nro",
                    name: item.id.toString(),
                    onConfirm: () => mutate({ id: item.id, status: 1 }),
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
      if (cellValue instanceof Date) {
        return cellValue.toLocaleDateString();
      }
      if (typeof cellValue === "object" && cellValue !== null) {
        return JSON.stringify(cellValue);
      }
      return String(cellValue);
  }
};
