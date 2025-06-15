import Input from '@/src/components/ui/Input';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { MdEmail, MdPermIdentity } from 'react-icons/md';
import { ClientFormData } from '@/src/types/dashboard/ClientType';
import { FaIdCard, FaPhone } from 'react-icons/fa';

type ClientFormProps = {
    register: UseFormRegister<ClientFormData>;
    errors: FieldErrors<ClientFormData>;
    watch: UseFormWatch<ClientFormData>;
    setValue: UseFormSetValue<ClientFormData>;
};

export default function ClientForm({ register, errors, watch, setValue }: ClientFormProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-5">
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
                            value: 3,
                            message: 'Debe tener al menos 8 caracteres',
                        },
                        maxLength: {
                            value: 20,
                            message: 'No debe superar los 20 caracteres',
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
                    maxLength={20}
                    register={register('apellido', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                            value: 3,
                            message: 'Debe tener al menos 8 caracteres',
                        },
                        maxLength: {
                            value: 20,
                            message: 'No debe superar los 20 caracteres',
                        },
                    })}
                    errorMessage={errors.apellido}
                />

            </div>

            <div className="grid grid-cols-2 gap-5">
                <Input
                    type="text"
                    placeholder="Celular"
                    htmlFor="celular"
                    label="Celular"
                    Icon={FaPhone}
                    maxLength={9}
                    inputMode="numeric"
                    pattern="\d*"
                    register={register('celular', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^9\d{8}$/,
                            message: 'Debe ser un número de 9 dígitos que inicie en 9',
                        },
                    })}
                    errorMessage={errors.celular}
                />

                <Input
                    type="text"
                    placeholder="DNI"
                    htmlFor="dni"
                    label="DNI"
                    Icon={FaIdCard}
                    maxLength={8}
                    inputMode="numeric"
                    pattern="\d*"
                    register={register('dni', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                            value: /^[1-9]\d{7}$/,
                            message: 'Debe ser un número de 8 dígitos que no inicie en 0',
                        },
                    })}
                    errorMessage={errors.dni}
                />
            </div>

            <Input
                type="email"
                placeholder="Correo"
                htmlFor="correo"
                label="Correo"
                Icon={MdEmail}
                maxLength={50}
                register={register('correo', {
                    required: 'Este campo es obligatorio',
                    pattern: {
                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: 'Debe ser un correo electrónico válido',
                    },
                })}
                errorMessage={errors.correo}
            />
        </div>
    );
}
