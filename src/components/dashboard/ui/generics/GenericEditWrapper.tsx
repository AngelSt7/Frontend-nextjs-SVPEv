import { useQuery } from '@tanstack/react-query';
import GenericModal from './GenericModal';
import { AuthUserInfo } from '@/src/types/AuthTypes';

type GenericEditWrapperProps<T> = {
  id: string;
  user?: AuthUserInfo;
  closeModal: () => void;
  serviceFunction: (id: number) => Promise<T>;
  queryKey: string;
};

export default function GenericEditWrapper<T>({ closeModal, id, user, serviceFunction, queryKey}: GenericEditWrapperProps<T>) {
  const { data } = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => serviceFunction(Number(id)),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== undefined,
  });

  if(data) return (
    <GenericModal
      id={id}
      closeModal={closeModal}
      defaultValues={data}
      {...(user && { user })}
    />
  );
}
