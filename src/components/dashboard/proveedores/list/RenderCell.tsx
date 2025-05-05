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
        case "location":
            return (
                <div className="min-w-36">
                    <p>Probando</p>
                </div>
            );
        case "availability":
            return (
                <Chip className="capitalize" color={theme} size="sm" variant="flat">
                    {supplier.activo}
                </Chip>
            );
        case "type":
            return <p className="text-bold text-sm capitalize">{supplier.apellido}</p>;
        case "price":
            return <div className=" min-w-24">
                <p className={`${supplier.celular === 'venta' ? 'hidden' : ''} text-bold text-xs capitalize text-default-400`}>Por mes</p>
                <p className="text-bold text-sm capitalize ">
                    {/* {formatCurrency(property.price, property.currency.currency)} */}
                    holaaa
                </p>
            </div>
        case "actions":
            return (
                // <ButtonsActions id={property.id} />
                <>
                </>
            );
    }

    return null;
});

export default RenderCell;
