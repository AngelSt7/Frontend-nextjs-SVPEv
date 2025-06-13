import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdWarrantyClaimService } from '@/src/services/dashboard/warranty-claim/dashboardFindByIdWarrantyClaimService';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type EditWarrantyClaimWrapperProps = {
  closeModal: () => void;
  id: string;
  user?: AuthUserInfo;
};

export default function EditWarrantyClaimWrapper({ user, closeModal, id }: EditWarrantyClaimWrapperProps) {
  const { data: warrantyClaimData } = useQuery({
    queryKey: ["warrantyClaim", id],
    queryFn: () => dashboardFindByIdWarrantyClaimService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });

  if (warrantyClaimData) {
    return (
      <GenericModal
        user={user}
        id={id}
        closeModal={closeModal}
        defaultValues={warrantyClaimData}
      />
    );
  }

  return null;
}
