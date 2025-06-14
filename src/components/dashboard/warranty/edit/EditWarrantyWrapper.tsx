import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/generics/GenericModal';
import { dashboardFindByIdWarrantyService } from '@/src/services/dashboard/warranty/dashboardFindByIdWarrantyService';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type EditWarrantyWrapperProps = {
  closeModal: () => void;
  id: string;
  user?: AuthUserInfo;
};

export default function EditWarrantyWrapper({ user, closeModal, id }: EditWarrantyWrapperProps) {
  const { data: warrantyData } = useQuery({
    queryKey: ["warranty", id],
    queryFn: () => dashboardFindByIdWarrantyService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  if (warrantyData) {
    return (
      <GenericModal
        id={id}
        user={user}
        closeModal={closeModal}
        defaultValues={warrantyData}
      />
    );
  }

  return null;
}
