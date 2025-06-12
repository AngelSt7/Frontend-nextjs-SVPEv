import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { DashboardStock } from "@/src/types/dashboard/Stocktypes";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import toast from "react-hot-toast";

export const RenderCellStock = (mutate: mutateProps, item: DashboardStock, columnKey: React.Key, openModalEdit?: (id: number) => void) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "producto":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: "/images/product-provisional.jpeg",
          }}
          name={cellValue}
        >
          {item.producto}
        </User>
      );

    case "lote": {
      return (
        <div className="flex items-center gap-2 group">
          <span className="text-sm text-gray-900 font-medium">{item.lote}</span>
          <button
            className="p-1 rounded hover:bg-gray-100 transition-colors duration-200 
                   opacity-60 group-hover:opacity-100"
            onClick={() => {
              navigator.clipboard.writeText(item.lote)
              toast.success("Copiado al portapapeles")
            }}
            title="Copiar lote"
          >
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      );
    }

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
                    name: item.producto,
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
