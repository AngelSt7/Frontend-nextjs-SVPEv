import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdPermIdentity } from 'react-icons/md';
import { CategoryFormData } from '@/src/types/CategoryTypes';

type CategoryFormProps = {
    register: UseFormRegister<CategoryFormData>;
    errors: FieldErrors<CategoryFormData>;
    watch: UseFormWatch<CategoryFormData>;
    setValue: UseFormSetValue<CategoryFormData>;
};

export default function CategoryForm({ register, errors, watch, setValue }: CategoryFormProps) {
    return (
        <div className="flex flex-col gap-3">

            <Input
                type="text"
                placeholder="Nombre"
                htmlFor="nombre"
                label="Nombre"
                Icon={MdPermIdentity}
                register={register('nombre', {
                    required: 'Este campo es obligatorio',
                    minLength: {
                        value: 8,
                        message: 'Debe tener al menos 8 caracteres',
                    },
                })}
                errorMessage={errors.nombre}
            />
        </div>
    );
}
