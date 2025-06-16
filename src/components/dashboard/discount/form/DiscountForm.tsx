import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdDiscount } from 'react-icons/md';
import { DiscountFormData } from '@/src/types/dashboard/DiscountTypes';
import SelectItem from '../../ui/SelectItem';
import SelectDate from '../../category/create/SelectDate';
import { useGetCategories } from '@/src/hooks/dashboard/useGetCategories';

type DiscountFormProps = {
    register: UseFormRegister<DiscountFormData>;
    errors: FieldErrors<DiscountFormData>;
    watch: UseFormWatch<DiscountFormData>;
    setValue: UseFormSetValue<DiscountFormData>;
};

export default function DiscountForm({ register, errors, watch, setValue }: DiscountFormProps) {
    const { data: categoryData = [] } = useGetCategories();
    const formatCategory = categoryData.map((category) => ({ label: category.nombre, id: category.id, activo: category.activo }));

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
                    type="text"
                    maxLength={5}
                    placeholder="Descuento (%)"
                    htmlFor="descuento"
                    label="Descuento aplicable"
                    Icon={MdDiscount}
                    register={register('porcentaje', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^\d{1,2}(\.\d{1,2})?$/,
                            message: 'El formato debe ser numérico (ej: 10.50, 10.00)',
                        },
                        validate: (value) => {
                            const num = value;
                            if (isNaN(num)) return 'El descuento debe ser numérico';
                            if (num < 0) return 'El descuento no puede ser negativo';
                            if (num > 99.99) return 'El descuento no puede exceder el 99.99%';
                            return true;
                        },
                    })}
                    errorMessage={errors.porcentaje}
                />

            </div>
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
        </div>
    );
}
