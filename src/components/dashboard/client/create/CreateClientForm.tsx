import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import ClientForm from '../form/ClientForm';
import { ClientFormData } from '@/src/types/dashboard/ClientType';
import { Client } from '@/src/services/dashboard/client/Client';

type CreateClientFormProps = {
    closeModal: () => void;
};

export default function CreateClientForm({ closeModal }: CreateClientFormProps) {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ClientFormData>();

    const { mutate } = useSubmitMutation({
        serviceFunction: Client.create,
        invalidateQuery: ['clients'],
        onSuccessCallback: closeModal,
        message: 'Cliente registrado exitosamente'
    })

    const onSubmit = (data: ClientFormData) => mutate(data);

    return (
        <form
            className="flex flex-col justify-between gap-3 flex-1 mt-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <ClientForm
                setValue={setValue}
                watch={watch}
                register={register}
                errors={errors}
            />

            <div className="w-full flex gap-4 justify-end mt-3">
                <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
                <Button color='success' type='submit'>Registrar Cliente</Button>
            </div>
        </form>
    );
}
