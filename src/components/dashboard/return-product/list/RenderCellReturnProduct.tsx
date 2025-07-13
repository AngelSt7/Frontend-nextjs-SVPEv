import { Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/feedback/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatDate } from "@/src/utils/format/formatDate";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardReturnProduct } from "@/src/types/dashboard/ReturnProductTypes";
import Clipboard from "../../ui/feedback/Clipboard";

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

    case "codigo_lote":
      return (
        <Clipboard
          text={item.codigo_lote}
          context="Lote"
          opacity={true}
        />
      )

    case "fecha_devolucion":
      return (
        <Clipboard
          text={item.fecha_devolucion}
          context="Fecha devolución"
          opacity={true}
        />
      )

      case "reposicion_aplicada":
      const statusTextReposicion = item.reposicion_aplicada === 1 ? "activo" : "inactivo";
      return (
        <Chip
          className="capitalize cursor-pointer select-none"
          color={statusColorMap[statusTextReposicion]}
          size="sm"
          variant="flat"
          role="button"
          tabIndex={0}
        >
          {item.reposicion_aplicada === 1 ? 'Aplica' : 'No aplica'}
        </Chip>

      );

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
              <DropdownItem key="edit" onPress={() => openModalEdit!(item.id_devolucion_producto)}>Editar</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    message: "Desea elminar la devolucción ligada al lote",
                    name: item.codigo_lote,
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
      return cellValue;
  }
};
