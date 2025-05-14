import { SupplierById } from '@/src/types/DashboardTypes';

type EditProductForm = {
  closeModal: () => void;
  defaultValues: SupplierById
};

export default function EditProductForm({ closeModal, defaultValues }: EditProductForm) {

//   const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ProductFormData>({defaultValues: defaultValues});

//   const { mutate } = useSubmitMutation({
//     serviceFunction: dashboardUpdateSupplierService,
//     invalidateQuery: 'suppliers',
//     onSuccessCallback: closeModal,
//     message: 'Proveedor actualizado exitosamente'
//   })

//   const onSubmit = (data: ProductFormData) => mutate({ ...data, activo: 1 });

  return (
    <form
      className="flex flex-col justify-between gap-3 flex-1 mt-2"
    //   onSubmit={handleSubmit(onSubmit)}
    >
      {/* <EditProductForm register={register} errors={errors} watch={watch} setValue={setValue} />
      <div className="w-full flex gap-4 justify-end mt-3">
        <Button color='danger' variant='flat' onPress={() => closeModal()}>Cancelar</Button>
        <Button color='success' type='submit'>Actualziar Proveedor</Button>
      </div> */}
    </form>
  );
}
