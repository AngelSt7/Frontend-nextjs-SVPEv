import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import SelectTabs from '../../ui/form/SelectTabs';
import { useGetAllSales } from '@/src/hooks/dashboard/data/useGetAllSales';
import ShowProductsReturns from './ShowProductsReturns';

type ReturnSaleFormProps = {
    register: UseFormRegister<ReturnSaleFormData>;
    errors: FieldErrors<ReturnSaleFormData>;
    watch: UseFormWatch<ReturnSaleFormData>;
    setValue: UseFormSetValue<ReturnSaleFormData>;
    productsReturn?: { id_producto: number; cantidad: number; nombreProducto: string; }[]
};

export default function ReturnSaleForm({ register, errors, watch, setValue, productsReturn }: ReturnSaleFormProps) {
    const { data: Sales = [] } = useGetAllSales()
    const salesFormated = Sales.map((sale) => ({ value: sale.id, label: sale.id.toString() }))
    const dataFormated = Sales.map(item => ({ id: item.id, detalleVentas: item.detallesVenta.map(detalle => ({ id: detalle.id, producto: detalle.nombreProducto, cantidad: detalle.cantidad })) }))
    const idFilter = watch('id_registro_venta')

    return (
        <div className="flex flex-col gap-3">

            <SelectTabs
                name="id_registro_venta"
                label="Venta"
                data={salesFormated}
                setValue={setValue}
                watch={watch}
                register={register('id_registro_venta', {
                    required: 'Este campo es obligatorio',
                })}
                errorMessage={errors.id_registro_venta}
                view='/dashboard/ventas'
            />

            {idFilter && (
                <> <p className='overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold text-[#202021] dark:text-[#c5c5c7]'>Productos de la venta</p>
                    {
                        <ShowProductsReturns
                            register={register}
                            errors={errors}
                            products={dataFormated.filter(item => item.id === idFilter).flatMap(item => item.detalleVentas.map(item => ({id_producto: item.id, cantidad: item.cantidad, nombre: item.producto})))}
                            productsReturn={productsReturn}
                            setValue={setValue}
                            idFilter={idFilter}
                        />
                    }
                </>
            )}

            <Input
                type="textarea"
                placeholder="Motivo de la devolución"
                htmlFor="motivo"
                label="Motivo"
                register={register('motivo')}
                errorMessage={errors.motivo}
            />
        </div>
    );
}
