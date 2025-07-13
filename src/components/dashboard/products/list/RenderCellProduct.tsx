import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { DashboardProduct } from "@/src/types/dashboard/ProductTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { ToastDelete } from "../../ui/feedback/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatCurrency } from "@/src/utils/format/formatCurrency";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import Clipboard from "../../ui/feedback/Clipboard";

export const RenderCellProduct = (mutate: mutateProps, item: DashboardProduct, columnKey: React.Key, openModalEdit?: (id: number) => void) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "nombre":
      return (
        <div className="group flex items-center gap-2">
          <User
            avatarProps={{
              radius: "lg",
              src: "/images/supplier-provisional.jpeg",
            }}
            description={formatDate(item.fecha_creacion)}
            name={<Clipboard
              text={`${item.nombre}`}
              context="Producto"
              opacity={false}
            />}
          />
        </div>
      );

    case "precio_venta":
      return (
        <Clipboard
          text={formatCurrency(item.precio_venta)}
          context="Precio"
          opacity={true}
        />
      )

    case "sku":
      return (
        <Clipboard
          text={item.sku}
          context="SKU"
          opacity={true}
        />
      )

    case "nombre_categoria":
      return (
        <Clipboard
          text={item.nombre_categoria}
          context="Categoría"
          opacity={true}
        />
      )

    case "nombre_marca":
      return (
        <Clipboard
          text={item.nombre_marca}
          context="Marca"
          opacity={true}
        />
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
            <DropdownMenu disabledKeys={item.activo === 0 ? ["edit", "delete"] : []}>
              <DropdownItem key="edit" onPress={() => openModalEdit!(item.id)}>Editar</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    message: `¿Desea eliminar el producto`,
                    name: item.nombre,
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
