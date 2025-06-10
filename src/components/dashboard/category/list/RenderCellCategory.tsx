import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ChipProps } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { mutateProps } from "@/src/types/dashboard/commonTypes/commonTypes";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatCurrency } from "@/src/utils/format/formatCurrency";
import { DashboardCategory } from "@/src/types/dashboard/CategoryTypes";

export const RenderCellCategory = (mutate: mutateProps, item: DashboardCategory, columnKey: React.Key, openModalEdit: (id: number) => void) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {
    case "nombre":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: "/images/product-provisional.jpeg",
          }}
         
          name={cellValue}
        >
          {item.nombre}
        </User>
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
              <DropdownItem key="edit" onPress={() => openModalEdit(item.id)}>Editar</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger"
                onPress={() => {
                  ToastDelete({
                    name: item.nombre,
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
