import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { statusColorMap } from "@/src/utils/constants/constans";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardSupplier } from "@/src/types/DashboardTypes";
import { Clipboard, ToastDelete } from "../../ui/feedback";

export const RenderCellSupplier = (mutate: mutateProps, item: DashboardSupplier, columnKey: React.Key, openModalEdit?: (id: number) => void) => {
  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {
    case "razon_social":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: "/images/supplier-provisional.jpeg",
          }}
          description={item.correo}
          name={
            <Clipboard
              text={`${item.razon_social}`}
              context="Razon social"
              opacity={false}
            />
          }
        >
          {item.correo}
        </User>
      );

    case "ruc":
      return (
        <Clipboard
          text={`${item.ruc.toString()}`}
          context="RUC"
        />
      )

    case "correo":
      return (
        <Clipboard
          text={`${item.correo}`}
          context="Correo"
        />
      )

    case "celular":
      return (
        <Clipboard
          text={`${item.celular.toString()}`}
          context="Celular"
        />
      )

    case "telefono":
      return (
        <Clipboard
          text={`${item.telefono ? item.telefono.toString() : "Sin telefono"}`}
          context="Telefono"
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
                    message: "¿Desea eliminar el proveedor cuya razón social es",
                    name: item.razon_social,
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
