import { Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { VerticalDotsIcon } from "../../ui/icons/VerticalDotsIcon";
import { ToastDelete } from "../../ui/ToastDelete";
import { mutateProps } from "@/src/types/commonTypes/commonTypes";
import { statusColorMap } from "@/src/utils/constants/constans";
import { DashboardDiscount } from "@/src/types/DiscountTypes";
import { formatDate } from "@/src/utils/format/formatDate";

export const RenderCellDiscount = (mutate: mutateProps, item: DashboardDiscount, columnKey: React.Key, openModalEdit: (id: number) => void) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {

        case "fecha_inicio":
            return (
                <p>{formatDate(item.fecha_inicio)}</p>
            )
        case "fecha_final":
            return (
                <p>{formatDate(item.fecha_final)}</p>
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
                            <DropdownItem key="edit" onPress={() => openModalEdit(item.id)}>Editar</DropdownItem>
                            <DropdownItem key="delete" className="text-danger" color="danger"
                                onPress={() => {
                                    ToastDelete({
                                        name: item.categoria,
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
