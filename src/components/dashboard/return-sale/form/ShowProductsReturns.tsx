import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import ShowProducts from './ShowProducts';
import { DashboardSale } from '@/src/types/dashboard/SaleTypes';
import { useEffect, useState } from 'react';

export type InitialState = {
    id_producto: number;
    cantidad: number;
    nombre: string;
}[]

type ShowProductsProps = {
    products: InitialState;
    productsReturn?: { nombreProducto: string; cantidad: number; id_producto: number; }[];
    register: UseFormRegister<ReturnSaleFormData>;
    errors: FieldErrors<ReturnSaleFormData>;
    idFilter: DashboardSale['id'];
    setValue: UseFormSetValue<ReturnSaleFormData>;
};

export default function ShowProductsReturns({ products, setValue, productsReturn }: ShowProductsProps) {
    const resolveProducts = products.map((item) => {
        const match = productsReturn?.find((p) => p.id_producto === item.id_producto);
        return {
            id_producto: item.id_producto,
            nombre: item.nombre,
            cantidad: match ? match.cantidad : 0,
        };
    });

    const [productReturn, setProductReturn] = useState<InitialState>(resolveProducts);
    
    useEffect(() => {
        setValue('devolucion', productReturn.map(item => ({ id_producto: item.id_producto, cantidad: item.cantidad })));
    }, [productReturn, setProductReturn])

    return (
        <div className=' flex flex-row gap-2'>
            {products.map(item => (
                <div key={item.id_producto}>
                    <ShowProducts
                        productReturn={productReturn}
                        product={item}
                        setProductReturn={setProductReturn}
                    />
                </div>
            ))}
        </div>
    );
}
