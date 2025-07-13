import { InitialState } from "@/src/components/dashboard/return-sale/form/ShowProductsReturns";
import { Dispatch, SetStateAction } from "react";

type ControlReturnsProps = {
    product: { id_producto: number; nombre: string; cantidad: number;};
    productReturn: InitialState;
    setProductReturn: Dispatch<SetStateAction<InitialState>>
}

export const useControlReturns = ({ product, setProductReturn, productReturn } : ControlReturnsProps) => {

    const currentProduct = productReturn.find(item => item.id_producto === product.id_producto);
    const currentQuantity = currentProduct?.cantidad || 0;

    const handleIncrease = (e: React.MouseEvent) => {
        e.stopPropagation();
        const id = product.id_producto;
        setProductReturn(productReturn.map(item =>
            item.id_producto === id
                ? { ...item, cantidad: Math.min(item.cantidad + 1, product.cantidad) }
                : item
        ));
    };

    const handleDecrease = (e: React.MouseEvent) => {
        e.stopPropagation();
        const id = product.id_producto;
        setProductReturn(productReturn.map(item =>
            item.id_producto === id
                ? { ...item, cantidad: Math.max(item.cantidad - 1, 0) }
                : item
        ));
    };

    return {
        handleIncrease,
        handleDecrease,
        currentProduct,
        currentQuantity
    }
}