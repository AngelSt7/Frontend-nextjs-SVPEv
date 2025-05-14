import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdProductService } from '@/src/services/dashboard/product/dashboardFindByIdProductService';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type EditProductWrapperProps = {
  user: AuthUserInfo
  closeModal: () => void
  id: string 
}

export default function EditProductWrapper({ user, closeModal, id }: EditProductWrapperProps) {

  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => dashboardFindByIdProductService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });
  
  if (product) return <GenericModal user={user} closeModal={closeModal} defaultValues={product} />;
}
