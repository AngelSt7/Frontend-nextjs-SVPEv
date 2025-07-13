import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation';
import { Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { AuthUserInfo } from '@/src/types/AuthTypes';
import { WarrantyFormData } from '@/src/types/dashboard/WarrantyTypes';
import WarrantyForm from '../form/WarrantyForm';
import { dashboardUpdateWarrantyService } from '@/src/services/dashboard/warranty/dashboardUpdateWarrantyService';

type EditWarrantyFormProps = {
  user?: AuthUserInfo;
  closeModal: () => void;
  defaultValues: WarrantyFormData & { id: number };
};

export default function EditWarrantyForm({ user, closeModal, defaultValues }: EditWarrantyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<WarrantyFormData>({
    defaultValues: {
      ...defaultValues,
      id_detalle_venta: defaultValues.id_detalle_venta
    }
  });

  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardUpdateWarrantyService,
    invalidateQuery: [
      ['warranties'],
      ['warranty', defaultValues.id.toString()]
    ],
    onSuccessCallback: closeModal,
    message: 'Garantía actualizada exitosamente'
  });

  const onSubmit = (data: WarrantyFormData) => {
    mutate({ ...data, id_garantia: defaultValues.id }); // aseguramos incluir el id para la actualización
  };

  return (
    <form
      noValidate
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <WarrantyForm
        register={register}
        errors={errors}
        watch={watch}
        setValue={setValue}
        isEdit={true}
      />

      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={closeModal}>Cancelar</Button>
        <Button color='success' type='submit'>Actualizar Garantía</Button>
      </div>
    </form>
  );
}
