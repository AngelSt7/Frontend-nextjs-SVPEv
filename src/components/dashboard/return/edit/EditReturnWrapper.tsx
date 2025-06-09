import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdReturnService } from '@/src/services/dashboard/return/dashboardFindByIdReturnService';

type EditReturnWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditReturnWrapper({ closeModal, id }: EditReturnWrapperProps) {

  const { data: returnData } = useQuery({
    queryKey: ["return", id],
    queryFn: () => dashboardFindByIdReturnService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (returnData) return <GenericModal id={id} closeModal={closeModal} defaultValues={returnData} />;
}



