import React from "react";
import { Chip, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { statusColorMap } from "@/src/utils/constants/constans";
import { DashboardUser } from "@/src/types/dashboard/UserTypes";
import { ToastDelete } from "../../ui/ToastDelete";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";

export const RenderCellUser = (
    mutate: mutateProps,
    item: DashboardUser,
    columnKey: React.Key,
    openModalEdit?: (id: number) => void
) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
        case "nombre":
            return (
                <User
                    avatarProps={{
                        radius: "lg",
                        src: "/image/user-provisional.jpeg",
                    }}
                    name={`${item.nombre} ${item.apellido}`}
                    description={item.correo}
                >
                    {item.correo}
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
                            <DropdownItem key="edit" onPress={() => openModalEdit!(item.id)}>
                                Editar
                            </DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onPress={() => {
                                    ToastDelete({
                                        name: `${item.nombre} ${item.apellido}`,
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
            return cellValue;
    }
};
