import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { DashboardReturnSale } from "@/src/types/dashboard/ReturnSaleTypes";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import Clipboard from "../../ui/Clipboard";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";

export const RenderCellReturnSale = (
  mutate: mutateProps,
  item: DashboardReturnSale,
  columnKey: React.Key,
  _openModalEdit?: (id: number) => void,
  openDetailsModal?: () => void,
  setReturnDetails?: (detail: DashboardReturnSale["detalles"]) => void
) => {

  const cellValue = item[columnKey as keyof typeof item];

  switch (columnKey) {

    case "correo":
      return (
        <User
          avatarProps={{
            radius: "lg",
            src: "../image/user-provisional.jpeg",
          }}
          name={<Clipboard
            text={`${item.usuario.nombre_empleado}`}
            context="Usuario"
            opacity={false}
          />}
          description={item.usuario.nombre_rol}
        >
          {item.usuario.correo}
        </User>
      )

    case "nombre_rol":
      return (
        <p>{item.usuario.nombre_rol}</p>
      )

    case "nombre_empleado":
      return (
        <Clipboard
          text={`${item.usuario.nombre_empleado}`}
          context="Usuario"
          opacity={true}
        />
      )

    case "fecha":
      return (
        <p>{formatDate(item.fecha.toString())}</p>
      )

    case "actions":
      return (
        <div className="relative flex justify-end items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="details" onPress={() => {
                openDetailsModal?.();
                setReturnDetails?.(item.detalles);
              }}>Ver detalle</DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => {
                  ToastDelete({
                    message: `¿Desea eliminar el usuario`,
                    name: `${item.usuario.nombre_empleado}`,
                    onConfirm: () => mutate({ id: item.id, activo: 1 }),
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
      if (Array.isArray(cellValue)) {
        return (
          <ul>
            {cellValue.map((detalle, idx) => (
              <li key={idx}>
                {detalle.nombreProducto} - {detalle.cantidad}
              </li>
            ))}
          </ul>
        );
      }

      // Para strings, numbers, etc.
      return <p>{String(cellValue)}</p>;
  }
};
