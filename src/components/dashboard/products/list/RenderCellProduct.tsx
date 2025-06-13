import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, ChipProps } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { DashboardProduct } from "@/src/types/dashboard/ProductTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { formatCurrency } from "@/src/utils/format/formatCurrency";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import toast from "react-hot-toast";

export const RenderCellProduct = (mutate: mutateProps, item: DashboardProduct, columnKey: React.Key, openModalEdit?: (id: number) => void) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {
      case "nombre":
    return (
      <User
        avatarProps={{
          radius: "lg",
          src: "/images/product-provisional.jpeg",
        }}
        description={
          <div className="flex items-center gap-2 group">
            <span className="text-xs text-gray-500">
              {item.fecha_creacion && formatDate(item.fecha_creacion)}
            </span>
            <button
              className="p-1 rounded hover:bg-gray-100 transition-colors duration-200 opacity-0 group-hover:opacity-100"
              onClick={() => {
                navigator.clipboard.writeText(item.nombre);
                toast.success("Nombre copiado al portapapeles");
              }}
              title="Copiar lote"
            >
              <svg
                className="w-4 h-4 text-gray-400 hover:text-gray-600"
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
        }
        name={cellValue}
      />
    );

    case "precio_venta":
      return (
        <p>{formatCurrency(item.precio_venta)}</p>
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
              <DropdownItem key="edit" onPress={() => openModalEdit!(item.id)}>Editar</DropdownItem>
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
