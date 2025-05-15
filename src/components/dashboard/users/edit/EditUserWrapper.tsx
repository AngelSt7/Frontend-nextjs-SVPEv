import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdUserService } from '@/src/services/dashboard/users/dashboardFindByIdUserService';

type EditProductWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditUserWrapper({ closeModal, id }: EditProductWrapperProps) {

  const { data: product } = useQuery({
    queryKey: ["user", id],
    queryFn: () => dashboardFindByIdUserService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });
  
  if (product) return <GenericModal closeModal={closeModal} defaultValues={product} />;
}
