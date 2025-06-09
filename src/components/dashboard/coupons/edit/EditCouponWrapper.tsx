import { useQuery } from '@tanstack/react-query';
import GenericModal from '../../ui/GenericModal';
import { dashboardFindByIdCouponService } from '@/src/services/dashboard/coupon/dashboardFindByIdCouponService';

type EditCouponWrapperProps = {
  closeModal: () => void
  id: string 
}

export default function EditCouponWrapper({ closeModal, id }: EditCouponWrapperProps) {

  const { data: coupon } = useQuery({
    queryKey: ["coupon", id],
    queryFn: () => dashboardFindByIdCouponService(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if (coupon) return <GenericModal id={id} closeModal={closeModal} defaultValues={coupon} />;
}
