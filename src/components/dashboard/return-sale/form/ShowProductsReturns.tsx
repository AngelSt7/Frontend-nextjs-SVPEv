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
    products: {
        id_producto: number;
        cantidad: number;
        nombre: string;
    }[]
    register: UseFormRegister<ReturnSaleFormData>;
    errors: FieldErrors<ReturnSaleFormData>;
    idFilter: DashboardSale['id'];
    setValue: UseFormSetValue<ReturnSaleFormData>;
};

export default function ShowProductsReturns({ products, setValue }: ShowProductsProps) {

    const [productReturn, setProductReturn] = useState<InitialState>(products.map(item => ({ ...item, cantidad: 0 })));
    useEffect(() => {
        setValue('devolucion', productReturn.map(item => ({ id_producto: item.id_producto, cantidad: item.cantidad })));
    }, [productReturn])

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
