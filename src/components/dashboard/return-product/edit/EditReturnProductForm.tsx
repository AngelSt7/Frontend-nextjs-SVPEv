import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { ReturnProductFormData } from '@/src/types/dashboard/ReturnProductTypes';
import ReturnForm from '../form/ReturnProductForm';
import { ReturnProduct } from '@/src/services/dashboard/return/ReturnProduct';
import { normalizeReturnProduct } from '@/src/utils/normalize/normalizeReturnProduct';

type EditReturnFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: ReturnProductFormData & { id: number };
};

export default function EditReturnForm({ user, closeModal, defaultValues }: EditReturnFormProps) {

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ReturnProductFormData>({
    defaultValues: normalizeReturnProduct(defaultValues)
  });

  const { mutate } = useSubmitMutation({
    serviceFunction: ReturnProduct.update,
    invalidateQuery: [
      ["returnsProducts"],
      ["returnProduct", defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Devolución actualizada exitosamente'
  })

  const onSubmit = (data: ReturnProductFormData) => mutate({...data, id_usuario: user!.id});

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ReturnForm isEdit={true} register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Devolución</Button>
      </div>
    </form>
  );
}
