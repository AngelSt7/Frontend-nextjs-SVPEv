import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdReturnSaleService } from '@/src/services/dashboard/return-sale/dashboardFindByIdReturnSaleService';

type EditReturnSaleWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditReturnSaleWrapper({ closeModal, id }: EditReturnSaleWrapperProps) {

  const { data: returnsaleData } = useQuery({
    queryKey: ["return-sale", id],
    queryFn: () => dashboardFindByIdReturnSaleService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (returnsaleData) return <GenericModal id={id} closeModal={closeModal} defaultValues={returnsaleData} />;
}



