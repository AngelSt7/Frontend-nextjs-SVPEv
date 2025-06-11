import { dashboardFindByIdStockService } from '@/src/services/dashboard/stock/dashboardFindByIdStockService';
import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type EditStockWrapperProps = {
  user: AuthUserInfo
  closeModal: () => void
  id: string 
}

export default function EditStockWrapper({ user,  closeModal, id }: EditStockWrapperProps) {

  const { data: stock } = useQuery({
    queryKey: ["stock", id],
    queryFn: () => dashboardFindByIdStockService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });
  
  if (stock) return <GenericModal user={user} closeModal={closeModal} defaultValues={stock} />;
}
