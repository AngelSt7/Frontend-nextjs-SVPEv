import Input from '@/src/components/ui/Input';
import { UserFormData } from '@/src/types/dashboard/UserTypes';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FaRegIdCard } from 'react-icons/fa';
import { MdOutlineMail, MdPermIdentity, MdPhoneIphone } from 'react-icons/md';
import SelectItem from '../../ui/SelectItem';
import { Roles } from '@/src/utils/constants/provisionalData';

type UserFormProps = {
    register: UseFormRegister<UserFormData>;
    errors: FieldErrors<UserFormData>;
    watch: UseFormWatch<UserFormData>;
    setValue: UseFormSetValue<UserFormData>;
};

export default function UserForm({ register, errors, watch, setValue }: UserFormProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-5">
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

                <Input
                    type="text"
                    placeholder="Apellido"
                    htmlFor="apellido"
                    label="Apellido"
                    Icon={MdPermIdentity}
                    register={register('apellido', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                            value: 8,
                            message: 'Debe tener al menos 8 caracteres',
                        },
                    })}
                    errorMessage={errors.apellido}
                />
            </div>

            <div className="flex gap-5">
                <Input
                    type="text"
                    placeholder="DNI"
                    htmlFor="dni"
                    label="DNI"
                    Icon={FaRegIdCard}
                    register={register('dni', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[1-9][0-9]{7}$/,
                            message: 'El DNI debe tener 8 dígitos y no comenzar con 0',
                        },
                    })}
                    errorMessage={errors.dni}
                />

                <Input
                    type="email"
                    placeholder="Correo electrónico"
                    htmlFor="correo"
                    label="Correo electrónico"
                    Icon={MdOutlineMail}
                    register={register('correo', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'El formato del correo electrónico no es válido',
                        },
                    })}
                    errorMessage={errors.correo}
                />
            </div>

            <Input
                type="text"
                placeholder="Celular"
                htmlFor="celular"
                label="Celular"
                Icon={MdPhoneIphone}
                register={register('celular', {
                    required: 'Este campo es obligatorio',
                    pattern: {
                        value: /^9[0-9]{8}$/,
                        message: 'El número de celular debe comenzar con 9 y tener 9 dígitos',
                    },
                })}
                errorMessage={errors.celular}
            />

            <SelectItem
                name="id_rol"
                label="Rol de usuario"
                data={Roles}
                register={register('id_rol', {
                    required: 'Este campo es obligatorio',
                    valueAsNumber: true,
                })}
                watch={watch}
                setValue={setValue}
                errorMessage={errors.id_rol}
            />

        </div>
    );
}
