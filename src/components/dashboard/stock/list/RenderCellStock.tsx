import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { DashboardStock } from "@/src/types/dashboard/StockTypes";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import Clipboard from "../../ui/Clipboard";

export const RenderCellStock = (mutate: mutateProps, item: DashboardStock, columnKey: React.Key, openModalEdit?: (id: number) => void) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "proveedor":
      return (
        <div className="group flex items-center gap-2 ">
          <User
            avatarProps={{
              radius: "lg",
              src: "/images/supplier-provisional.jpeg",
            }}
            name={<Clipboard
              text={`${item.proveedor}`}
              context="Proveedor"
              opacity={false}
            />}
          />
        </div>
      );

    case "producto":
      return (
        <div className="group flex items-center gap-2 ">
          <User
            avatarProps={{
              radius: "lg",
              src: "/images/product-provisional.jpeg",
            }}
            name={<Clipboard
              text={`${item.producto}`}
              context="Producto"
              opacity={false}
            />}
          />
        </div>
      );

    case "lote": {
      return (
        <Clipboard
          text={`${item.lote}`}
          context="Lote"
          opacity={true}
        />
      );
    }

    case "numero_documento":
      return (
        <Clipboard
          text={`${item.numero_documento}`}
          context="Documento"
          opacity={true}
        />
      );

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
              <DropdownItem key="edit" onPress={() => openModalEdit!(item.id)}>Editar</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    message: "¿Desea eliminar el stock cuyo lote es",
                    name: item.lote,
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
