import { Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { statusColorMap } from "@/src/utils/constants/constans";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { DashboardClient } from "@/src/types/dashboard/ClientType";
import Clipboard from "../../ui/Clipboard";

export const RenderCellClient = (mutate: mutateProps, item: DashboardClient, columnKey: React.Key, openModalEdit?: (id: number) => void) => {
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
                        description={item.correo}
                        name={<Clipboard
                            text={`${item.nombre} ${item.apellido}`}
                            context="Cliente"
                            opacity={false}
                        />}
                    />
                </div>
            );

        case "dni":
            return (
                <Clipboard
                    text={`${item.dni}`}
                    context="DNI"
                />
            )

        case "celular":
            return (
                <Clipboard
                    text={`${item.celular}`}
                    context="Celular"
                />
            )

        case "correo":
            return (
                <Clipboard
                    text={`${item.correo}`}
                    context="Correo"
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
                                        message: "¿Estas seguro de eliminar el cliente",
                                        name: item.nombre + " " + item.apellido,
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
