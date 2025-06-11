import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdReturnService } from '@/src/services/dashboard/return/dashboardFindByIdReturnService';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type EditReturnWrapperProps = {
  closeModal: () => void
  id: string 
  user?: AuthUserInfo
}

export default function EditReturnWrapper({ user, closeModal, id }: EditReturnWrapperProps) {

  const { data: returnData } = useQuery({
    queryKey: ["returnProduct", id],
    queryFn: () => dashboardFindByIdReturnService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (returnData) return <GenericModal user={user} id={id} closeModal={closeModal} defaultValues={returnData} />;
}



