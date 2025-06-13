import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { WarrantyClaimFormData } from '@/src/types/dashboard/WarrantyClaimTypes';
import WarrantyClaimForm from '../form/WarrantyClaimForm';
import { dashboardUpdateWarrantyClaimService } from '@/src/services/dashboard/warranty-claim/dashboardUpdateWarrantyClaimService';

type EditWarrantyClaimFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: WarrantyClaimFormData & { id: number };
};

export default function EditWarrantyClaimForm({ user, closeModal, defaultValues }: EditWarrantyClaimFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<WarrantyClaimFormData>({
    defaultValues: {
      ...defaultValues,
      id_garantia: defaultValues.id_garantia
    }
  });

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateWarrantyClaimService,
    invalidateQuery: [
      ['warrantyClaims'],
      ['warrantyClaim', defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Reclamo actualizado exitosamente'
  });

  const onSubmit = (data: WarrantyClaimFormData) => {
    mutate({ ...data }); // No necesitas agregar id_usuario si no se usa en el backend
  };

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <WarrantyClaimForm
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        isEdit={true}
      />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Reclamo</Button>
      </div>
    </form>
  );
}
