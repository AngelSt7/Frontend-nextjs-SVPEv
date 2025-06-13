import { FieldError, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ReturnProductFormData } from '@/src/types/dashboard/ReturnProductTypes';
import { useGetStock } from '@/src/hooks/dashboard/useGetStock';
import { useMemo } from 'react';
import SelectTabs from '../../stock/form/SelectTabs';
import Input from '@/src/components/ui/Input';
import { MdPermIdentity } from 'react-icons/md';
import SerieControl from '../../stock/form/SerieControl';
import { Switch } from '@heroui/react';

type ReturnFormProps = {
    register: UseFormRegister<ReturnProductFormData>;
    errors: FieldErrors<ReturnProductFormData>;
    watch: UseFormWatch<ReturnProductFormData>;
    setValue: UseFormSetValue<ReturnProductFormData>;
    isEdit?: boolean
};

export default function ReturnForm({ register, errors, watch, setValue, isEdit = false }: ReturnFormProps) {
    const { data: returnProducts = [] } = useGetStock();
    const returnProductsFormated = useMemo(() => returnProducts.map(r => ({ value: r.id, label: r.lote })), [returnProducts])

    const reposicionAplicada = watch("reposicionAplicada");
    const isSelected = reposicionAplicada === 1;
    const handleChange = (value: boolean) => { setValue("reposicionAplicada", value ? 1 : 0); };

    return (
        <div className="flex flex-col gap-3">

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

            <SerieControl
                name="tipo_serie"
                tabsName="series"
                register={register}
                setValue={setValue}
                watch={watch}
                errorMessage={errors.series as FieldError}
            />

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

            <Switch  isSelected={isSelected} onValueChange={handleChange} {...register("reposicionAplicada")}>
                ¿Aplicar reposición?
            </Switch>
        </div>
    );
}
