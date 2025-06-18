import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ReturnProductFormData } from '@/src/types/dashboard/ReturnProductTypes';
import { useGetStock } from '@/src/hooks/dashboard/useGetStock';
import { useMemo } from 'react';
import SelectTabs from '../../stock/form/SelectTabs';
import Input from '@/src/components/ui/Input';
import { MdPermIdentity } from 'react-icons/md';
import ActiveReposition from '../create/ActiveReposition';
import MultiSelectTabs from '../../stock/form/MultiSelectTabs';

type ReturnFormProps = {
    register: UseFormRegister<ReturnProductFormData>;
    errors: FieldErrors<ReturnProductFormData>;
    watch: UseFormWatch<ReturnProductFormData>;
    setValue: UseFormSetValue<ReturnProductFormData>;
    seriesFormated?: { label: string, value: number, filter: number }[],
    isEdit: boolean
};

export default function ReturnForm({ register, errors, watch, setValue, isEdit, seriesFormated }: ReturnFormProps) {
    const { data: returnProducts = [] } = useGetStock();
    const returnProductsFormated = useMemo(() => returnProducts.map(r => ({ value: r.id, label: r.lote })), [returnProducts])
    const id_ingreso = watch('id_detalle_ingreso');
    const data = seriesFormated?.filter(s => s.filter === id_ingreso)

    return (
        <div className="flex flex-col gap-3">

            {isEdit && (
                <p className=' text-justify'>Por el momento, no se puede cambiar de devolucion a una que cuente con series, ni cambiar estas series, contactar con el servicio tecnico: +51 940 104 078</p>
            )}

            {!isEdit && (
                <SelectTabs
                    name="id_detalle_ingreso"
                    label="lote de ingreso"
                    data={returnProductsFormated}
                    setValue={setValue}
                    watch={watch}
                    register={register('id_detalle_ingreso', {
                        required: 'Este campo es obligatorio',
                    })}
                    errorMessage={errors.id_detalle_ingreso}
                    view={'/dashboard/stock'}
                />
            )}

            <div className="flex gap-x-4 w-full">
                <Input
                    type="number"
                    placeholder="Cantidad"
                    htmlFor="cantidad"
                    label="Cantidad"
                    Icon={MdPermIdentity}
                    register={register('cantidad', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: 'Debe ser al menos 5',
                        },
                        max: {
                            value: 100,
                            message: 'No puede superar las 9999 unidades',
                        },
                    })}
                    errorMessage={errors.cantidad}
                />
            </div>

            {(!isEdit && id_ingreso && data && data.length > 0) &&
                <MultiSelectTabs
                    data={data}
                    name="series"
                    register={register("series", {
                        required: 'Este campo es obligatorio'
                    })}
                    setValue={setValue}
                    watch={watch}
                    label="Selecciona las series"
                />
            }

            <Input
                type="textarea"
                htmlFor="observaciones"
                label="Observaciones"
                maxLength={200}
                placeholder="Detalles del ingreso"
                register={register('observaciones', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 15,
                        message: 'Debe tener al menos 15 caracteres',
                    },
                    maxLength: {
                        value: 200,
                        message: 'No debe superar los 200 caracteres',
                    },
                })}
                errorMessage={errors.observaciones}
            />

            <Input
                type="textarea"
                htmlFor="motivo"
                label="Motivo"
                maxLength={200}
                placeholder="Detalles del ingreso"
                register={register('motivo', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 15,
                        message: 'Debe tener al menos 15 caracteres',
                    },
                    maxLength: {
                        value: 200,
                        message: 'No debe superar los 200 caracteres',
                    },
                })}
                errorMessage={errors.motivo}
            />

            <ActiveReposition
                register={register}
                watch={watch}
                setValue={setValue}
            />

        </div>
    );
}
