import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CategoryFormData } from '@/src/types/dashboard/CategoryTypes';
import { MdPermIdentity } from 'react-icons/md';
import Input from '@/src/components/ui/Input';
import SelectItem from '../../ui/form/SelectItem';

type CategoryFormProps = {
    register: UseFormRegister<CategoryFormData>;
    errors: FieldErrors<CategoryFormData>;
    watch: UseFormWatch<CategoryFormData>;
    setValue: UseFormSetValue<CategoryFormData>;
    formatCategoryTwo: { label: string; activo: number; id: number; }[]
    formatCategoryThree: { label: string; activo: number; id: number; }[]
};

export default function CategoryForm({ register, errors, watch, setValue, formatCategoryTwo, formatCategoryThree }: CategoryFormProps) {
    const showField = watch('nivel')

    return (
        <div className="flex flex-col gap-3">
            {showField ? <p> Según el nivel que seleccionaste, la categoria será de nivel {showField}</p> : null}

            <SelectItem
                name="nivel"
                label="Nivel de categoria"
                data={[
                    { id: 1, label: 'Nivel 1', activo: 1 },
                    { id: 2, label: 'Nivel 2', activo: 1 },
                    { id: 3, label: 'Nivel 3', activo: 1 },
                ]}
                register={register('nivel', {
                    required: 'Este campo es obligatorio',
                    valueAsNumber: true,
                })}
                watch={watch}
                setValue={setValue}
                errorMessage={errors.nivel}
            />

            {(showField === 2 || showField === 3) && (
                <SelectItem
                    name="id_categoria_padre"
                    label="Categoria Padre"
                    data={showField === 2 ? formatCategoryTwo : formatCategoryThree}
                    register={register('id_categoria_padre', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                    })}
                    watch={watch}
                    setValue={setValue}
                    errorMessage={errors.id_categoria_padre}
                />
            )}

            <Input
                type="text"
                placeholder="Nombre"
                htmlFor="nombre"
                label="Nombre"
                Icon={MdPermIdentity}
                maxLength={40}
                register={register('nombre', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 3,
                        message: 'Debe tener al menos 8 caracteres',
                    },
                    maxLength: {
                        value: 40,
                        message: 'No debe superar los 40 caracteres',
                    },
                })}
                errorMessage={errors.nombre}
            />

        </div>
    );
}

