import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ReturnSaleFormData } from '@/src/types/dashboard/ReturnSaleTypes';
import SelectTabs from '../../stock/form/SelectTabs';
import { useGetAllSales } from '@/src/hooks/dashboard/useGetAllSales';
import ShowProducts from './ShowProducts';

type ReturnSaleFormProps = {
    register: UseFormRegister<ReturnSaleFormData>;
    errors: FieldErrors<ReturnSaleFormData>;
    watch: UseFormWatch<ReturnSaleFormData>;
    setValue: UseFormSetValue<ReturnSaleFormData>;
};

export default function ReturnSaleForm({ register, errors, watch, setValue }: ReturnSaleFormProps) {
    const { data: Sales = [] } = useGetAllSales()
    const idFilter = watch('id_detalle_venta')
    const salesFormated = Sales.map((sale) => ({ value: sale.id, label: sale.id.toString() }))
    const dataFormated = Sales.map(item => ({ id: item.id, detalleVentas: item.detallesVenta.map(detalle => ({ id: detalle.id, producto: detalle.nombreProducto, cantidad: detalle.cantidad })) }))

    return (
        <div className="flex flex-col gap-3">

            <SelectTabs
                name="id_detalle_venta"
                label="Venta"
                data={salesFormated}
                setValue={setValue}
                watch={watch}
                register={register('id_detalle_venta', {
                    required: 'Este campo es obligatorio',
                })}
                errorMessage={errors.id_detalle_venta}
                view='/dashboard/ventas'
            />

            {idFilter && (
                <> <p className='overflow-hidden whitespace-nowrap text-ellipsis text-base font-semibold text-[#202021] dark:text-[#c5c5c7]'>Productos de la venta</p>
                    {dataFormated
                        .filter(item => item.id === idFilter)
                        .flatMap(item =>
                            item.detalleVentas.map((detail, index) => (
                                <ShowProducts
                                    key={index}
                                    register={register}
                                    errors={errors}
                                    detail={detail}
                                    index={index}
                                />
                            ))
                        )}
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
