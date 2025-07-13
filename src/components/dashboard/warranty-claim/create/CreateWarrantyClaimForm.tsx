import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import WarrantyClaimForm from '../form/WarrantyClaimForm';
import { dashboardCreateWarrantyClaimService } from '@/src/services/dashboard/warranty-claim/dashboardCreateWarrantyClaimService';
import { WarrantyClaimFormData } from '@/src/types/dashboard/WarrantyClaimTypes';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type CreateWarrantyClaimFormProps = {
  closeModal: () => void;
  user?: AuthUserInfo;
};

export default function CreateWarrantyClaimForm({ closeModal, user }: CreateWarrantyClaimFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<WarrantyClaimFormData>();

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardCreateWarrantyClaimService,
    invalidateQuery: ['warrantyClaims'],
    onSuccessCallback: closeModal,
    message: 'Reclamo registrado exitosamente'
  });

  const onSubmit = (data: WarrantyClaimFormData) => {
    mutate({ ...data });
  };

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <WarrantyClaimForm setValue={setValue} watch={watch} register={register} errors={errors} />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color="danger" variant="flat" onPress={closeModal}>
          Cancelar
        </Button>
        <Button color="success" type="submit">
          Registrar Reclamo
        </Button>
      </div>
    </form>
  );
}