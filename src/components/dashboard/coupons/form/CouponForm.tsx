import Input from '@/src/components/ui/Input';
import { CouponFormData } from '@/src/types/dashboard/CouponTypes';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDiscount, MdPermIdentity } from 'react-icons/md';
import SelectDate from '../../category/create/SelectDate';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';
import SelectItem from '../../ui/SelectItem';

type CouponFormProps = {
    register: UseFormRegister<CouponFormData>;
    errors: FieldErrors<CouponFormData>;
    watch: UseFormWatch<CouponFormData>;
    setValue: UseFormSetValue<CouponFormData>;
};

export default function CouponForm({ register, errors, watch, setValue }: CouponFormProps) {
    const { data: categoryData = [] } = useGetCategories();
    return (
        <div className="flex flex-col gap-3">

            <div className="grid grid-cols-2 gap-5">


                <Input
                    type="text"
                    placeholder="Nombre"
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

                <Input
                    type="number"
                    placeholder="Descuento (%)"
                    htmlFor="descuento"
                    label="Descuento aplicable"
                    Icon={MdDiscount}
                    maxLength={2}
                    register={register('descuento', {
                        required: 'Este campo es obligatorio',
                        min: {
                            value: 0,
                            message: 'El decuento debe un valor positivo',
                        },
                        max: {
                            value: 99,
                            message: 'El descuento no puede exceder el 99%',
                        },
                        valueAsNumber: true
                    })}
                    errorMessage={errors.descuento}
                />

            </div>

            <SelectItem
                name="id_categoria"
                label="Categoría"
                data={categoryData}
                register={register('id_categoria', {
                    required: 'Este campo es obligatorio',
                    valueAsNumber: true,
                })}
                watch={watch}
                setValue={setValue}
                errorMessage={errors.id_categoria}
            />

            <div className="flex gap-x-4 w-full">
                <SelectDate
                    watch={watch}
                    setValue={setValue}
                    registerInicio={register('fecha_inicio', { required: 'Este campo es obligatorio' })}
                    registerFinal={register('fecha_final', { required: 'Este campo es obligatorio' })}
                    nameInicio="fecha_inicio"
                    nameFinal="fecha_final"
                    errorMessage={{
                        fecha_inicio: errors.fecha_inicio,
                        fecha_final: errors.fecha_final,
                    }}
                />
            </div>
        </div>
    );
}
