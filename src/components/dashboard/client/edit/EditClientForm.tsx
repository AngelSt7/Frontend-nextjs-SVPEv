import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import ClientForm from '../form/ClientForm';
import { ClientFormData, DashboardClientById } from '@/src/types/dashboard/ClientType';
import { Client } from '@/src/services/dashboard/client/Client';

type EditCouponFormProps = {
  closeModal: () => void;
  defaultValues: DashboardClientById
};

export default function EditClientForm({closeModal, defaultValues }: EditCouponFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ClientFormData>({defaultValues: defaultValues});

  const { mutate } = useSubmitMutation({
    serviceFunction: Client.update,
    invalidateQuery: [
      ["clients"],
      ["client", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Cliente actualizado exitosamente'
  })

  const onSubmit = (data: ClientFormData) => mutate(data);

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ClientForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Cliente</Button>
      </div> 
    </form>
  );
}
