import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdCategoryService } from '@/src/services/dashboard/category/dashboardFindByIdCategoryService';

type EditCategoryWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditCategoryWrapper({ closeModal, id }: EditCategoryWrapperProps) {

  const { data: category } = useQuery({
    queryKey: ["coupon", id],
    queryFn: () => dashboardFindByIdCategoryService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (category) return <GenericModal id={id} closeModal={closeModal} defaultValues={category} />;
}
