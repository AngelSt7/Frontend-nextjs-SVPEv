import { Key, memo } from "react";
import { User as ImageProperty, Chip } from "@heroui/react";
import { DashboardSupplier } from "@/src/types/DashboardTypes";

// import ButtonsActions from "./ButtonsActions";

type RenderCellProps = {
    supplier: DashboardSupplier
    columnKey: Key
}

const RenderCell = memo(({ supplier, columnKey }: RenderCellProps) => {
    const theme = supplier.activo ? "success" : "danger";

    switch (columnKey) {
        case "id":
            return (
                <div className="min-w-36">
                    <p>{supplier.id}</p>
                </div>
            );
        case "proveedor":
            return (
                <p className="capitalize" color={theme} >
                    {supplier.nombre + " " + supplier.apellido}
                </p>
            );
        case "correo":
            return <p className="text-bold text-sm capitalize">{supplier.correo}</p>;
        case "celular":
            return <div className=" min-w-24">
                <p className={`${supplier.celular} text-bold text-xs capitalize text-default-400`}>{supplier.celular}</p>
            </div>
        case "acciones":
            return (
                // <ButtonsActions id={property.id} />
                <>
                </>
            );
    }

    return null;
});

export default RenderCell;
