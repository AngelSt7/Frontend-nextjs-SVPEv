import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { formatDate } from "@/src/utils/format/formatDate";
import { DashboardReturnSale } from "@/src/types/dashboard/ReturnSaleTypes";
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@heroui/react";
import Clipboard from "../../ui/feedback/Clipboard";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";

export const RenderCellReturnSale = (
  _mutate: undefined | mutateProps,
  item: DashboardReturnSale,
  columnKey: React.Key,
  openModalEdit?: (id: number) => void,
  openDetailsModal?: () => void,
  setReturnDetails?: (detail: DashboardReturnSale["detalles"]) => void,
  openModalStatus?: (id: number) => void
) => {

  const styleChip = () => {
    switch (item.estado) {
      case "PENDIENTE":
        return "warning"
      case "APROBADO":
        return "success"
      case "RECHAZADO":
        return "danger"
      case "RESUELTO":
        return "secondary"
    }
  }
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

    case "estado":
      return (
        <Chip
          size="sm"
          className="capitalize cursor-pointer select-none"
          color={styleChip()}
          onDoubleClick={() => openModalStatus?.(item.id)}
        >{item.estado.toLowerCase()}
        </Chip>
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
              <DropdownItem key="status" onPress={() => openModalStatus?.(item.id)}>Cambiar estado</DropdownItem>
              <DropdownItem key="edit" onPress={() => openModalEdit?.(item.id)}>Editar</DropdownItem>
              <DropdownItem key="details" onPress={() => {
                openDetailsModal?.();
                setReturnDetails?.(item.detalles);
              }}>Ver detalle</DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"

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
