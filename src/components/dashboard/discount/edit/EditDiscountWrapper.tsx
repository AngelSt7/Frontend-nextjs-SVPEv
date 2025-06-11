import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdDiscountService } from '@/src/services/dashboard/discount/dashboardFindByIdDiscountService';

type EditDiscountWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditDiscountWrapper({ closeModal, id }: EditDiscountWrapperProps) {

  const { data: category } = useQuery({
    queryKey: ["discount", id],
    queryFn: () => dashboardFindByIdDiscountService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });
  if (category) return <GenericModal id={id} closeModal={closeModal} defaultValues={category} />;
}



