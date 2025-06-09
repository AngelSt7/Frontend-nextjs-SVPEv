import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDiscount } from 'react-icons/md';
import { DiscountFormData } from '@/src/types/DiscountTypes';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';
import SelectItem from '../../ui/SelectItem';
import SelectDate from '../../category/create/SelectDate';

type DiscountFormProps = {
    register: UseFormRegister<DiscountFormData>;
    errors: FieldErrors<DiscountFormData>;
    watch: UseFormWatch<DiscountFormData>;
    setValue: UseFormSetValue<DiscountFormData>;
};

export default function DiscountForm({ register, errors, watch, setValue }: DiscountFormProps) {
    const { data: categoryData = [] } = useGetCategories();

    return (
        <div className="flex flex-col gap-3">

            <div className="grid grid-cols-2 gap-5">


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
