import Input from '@/src/components/ui/Input';
import { UserFormData } from '@/src/types/UserTypes';
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
                            value: 2,
                            message: 'Debe tener al menos 2 caracteres',
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
                            value: 2,
                            message: 'Debe tener al menos 2 caracteres',
                        },
                    })}
                    errorMessage={errors.apellido}
                />
            </div>

            <Input
                type="text"
                placeholder="DNI"
                htmlFor="dni"
                label="DNI"
                Icon={FaRegIdCard}
                register={register('dni', {
                    required: 'Este campo es obligatorio',
                    pattern: {
                        value: /^[0-9]{8}$/,
                        message: 'El DNI debe tener 8 dígitos',
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

            <Input
                type="text"
                placeholder="Celular"
                htmlFor="celular"
                label="Celular"
                Icon={MdPhoneIphone}
                register={register('celular', {
                    required: 'Este campo es obligatorio',
                    pattern: {
                        value: /^[0-9]{9}$/,
                        message: 'El número de celular debe tener 9 dígitos',
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
