import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdPermIdentity } from 'react-icons/md';

import SelectItem from '../../ui/SelectItem';
import { CategoryFormData } from '@/src/types/dashboard/CategoryTypes';
// import { CategoryFormData } from '@/src/types/dashboard/CategoryTypes';
type CategoryFormProps = {
    register: UseFormRegister<CategoryFormData>;
    errors: FieldErrors<CategoryFormData>;
    watch: UseFormWatch<CategoryFormData>;
    setValue: UseFormSetValue<CategoryFormData>;
    formatCategory: { label: string; activo: number; id: number; }[]
};

export default function CategoryForm({ register, errors, watch, setValue, formatCategory }: CategoryFormProps) {
    return (
        <div className="flex flex-col gap-3">

            <Input
                type="text"
                placeholder="Nombre"
                htmlFor="nombre"
                label="Nombre"
                Icon={MdPermIdentity}
                maxLength={20}
                register={register('nombre', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 8,
                        message: 'Debe tener al menos 8 caracteres',
                    },
                    maxLength: {
                        value: 20,
                        message: 'No debe superar los 20 caracteres',
                    },
                })}
                errorMessage={errors.nombre}
            />

            <div className="grid grid-cols-2 gap-5">

                <SelectItem
                    name="id_categoria_padre"
                    label="Categoria Padre"
                    data={formatCategory}
                    register={register('id_categoria_padre', {
                        required: 'Este campo es obligatorio',
                        valueAsNumber: true,
                    })}
                    watch={watch}
                    setValue={setValue}
                    errorMessage={errors.id_categoria_padre}
                />

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
            </div>
        </div>
    );
}
