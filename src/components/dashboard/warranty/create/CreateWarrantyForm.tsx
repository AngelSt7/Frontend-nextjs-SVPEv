import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import WarrantyForm from '../form/WarrantyForm';
import { WarrantyFormData } from '@/src/types/dashboard/WarrantyTypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { Warranty } from '@/src/services/dashboard/warranty/Warranty';

type CreateWarrantyFormProps = {
  closeModal: () => void;
};

export default function CreateWarrantyForm({ closeModal }: CreateWarrantyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<WarrantyFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: Warranty.create,
    invalidateQuery: ['warranties'],
    onSuccessCallback: closeModal,
    message: 'Garantía registrada exitosamente'
  });

  const onSubmit = (data: WarrantyFormData) => {
    mutate({ ...data });
  };

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <WarrantyForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color="danger" variant="flat" onPress={closeModal}>
          Cancelar
        </Button>
        <Button color="success" type="submit">
          Registrar Garantía
        </Button>
      </div>
    </form>
  );
}
