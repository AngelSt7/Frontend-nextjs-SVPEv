import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdSupplierService } from '@/src/services/dashboard/Supplier/dashboardFindByIdSupplierService';

type EditSupplierWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditSupplierWrapper({ closeModal, id }: EditSupplierWrapperProps) {

  const { data: supplier } = useQuery({
    queryKey: ["supplier", id],
    queryFn: () => dashboardFindByIdSupplierService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (supplier) return <GenericModal id={id} closeModal={closeModal} defaultValues={supplier} />;
}
