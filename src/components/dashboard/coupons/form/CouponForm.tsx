import Input from '@/src/components/ui/Input';
import { CouponFormData } from '@/src/types/dashboard/CouponTypes';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDiscount, MdPermIdentity } from 'react-icons/md';
import SelectDate from '../../category/create/SelectDate';
import SelectItem from '../../ui/SelectItem';

type CouponFormProps = {
    register: UseFormRegister<CouponFormData>;
    errors: FieldErrors<CouponFormData>;
    watch: UseFormWatch<CouponFormData>;
    setValue: UseFormSetValue<CouponFormData>;
};
export default function CouponForm({ register, errors, watch, setValue }: CouponFormProps) {
    const typeDiscount = watch('tipo_descuento');
    return (
        <div className="flex flex-col gap-3">

                <Input
                    type="text"
                    placeholder="Codigo de cupon"
                    htmlFor="nombre"
                    label="Nombre"
                    maxLength={8}
                    Icon={MdPermIdentity}
                    register={register('codigo', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                            value: 8,
                            message: 'Debe tener al menos 8 caracteres',
                        }, maxLength: {
                            value: 8,
                            message: 'No debe superar los 8 caracteres',
                        }
                    })}
                    errorMessage={errors.codigo}
                />

            <div className="flex gap-x-4 w-full">
                <SelectDate
                    watch={watch}
                    setValue={setValue}
                    registerInicio={register('fecha_inicio', { required: 'Este campo es obligatorio' })}
                    registerFinal={register('fecha_fin', { required: 'Este campo es obligatorio' })}
                    nameInicio="fecha_inicio"
                    nameFinal="fecha_fin"
                    errorMessage={{
                        fecha_inicio: errors.fecha_inicio,
                        fecha_final: errors.fecha_fin,
                    }}
                />
            </div>

            <div className="flex gap-x-4 w-full">
                <SelectItem
                    name="tipo_descuento"
                    label="Descuento"
                    data={[
                        { id: 1, label: 'PORCENTAJE', activo: 1 },
                        { id: 2, label: 'MONTO', activo: 1 },
                    ]}
                    register={register('tipo_descuento', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                    })}
                    watch={watch}
                    setValue={setValue}
                    errorMessage={errors.tipo_descuento}
                />

                <Input
                    type="number"
                    placeholder="Máximo de usos"
                    htmlFor="max_usos"
                    label="Máximo de usos"
                    Icon={MdPermIdentity}
                    register={register('max_usos', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                        min: {
                            value: 1,
                            message: 'Debe ser al menos 1 uso',
                        },
                        max: {
                            value: 200,
                            message: 'No puede superar los 200 usos',
                        },
                    })}
                    errorMessage={errors.max_usos}
                />
            </div>

            {typeDiscount === 1 && (
                <Input
                    type="number"
                    placeholder="Descuento (%)"
                    htmlFor="descuento"
                    label="Descuento aplicable (%)"
                    Icon={MdDiscount}
                    maxLength={2}
                    register={register('descuento_porcentaje', {
                        required: 'Este campo es obligatorio',
                        min: {
                            value: 0,
                            message: 'El descuento debe ser un valor positivo',
                        },
                        max: {
                            value: 99,
                            message: 'El descuento no puede exceder el 99%',
                        },
                        valueAsNumber: true,
                    })}
                    errorMessage={errors.descuento_porcentaje}
                />
            )}
            {typeDiscount === 2 && (
                <Input
                    type="number"
                    placeholder="Descuento (S/)"
                    htmlFor="descuento"
                    label="Descuento aplicable (monto)"
                    Icon={MdDiscount}
                    maxLength={3}
                    register={register('descuento_monto', {
                        required: 'Este campo es obligatorio',
                        min: {
                            value: 0,
                            message: 'El descuento debe ser un valor positivo',
                        },
                        max: {
                            value: 200,
                            message: 'El descuento no puede exceder los S/ 200',
                        },
                        valueAsNumber: true,
                    })}
                    errorMessage={errors.descuento_monto}
                />
            )}
        </div>
    );
}
