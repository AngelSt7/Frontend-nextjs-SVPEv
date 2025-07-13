import { useQuery } from '@tanstack/react-query';
import api from '@/src/axios/axios';
import { AuthUserInfoSchema } from '@/src/schemas/Auth';
import { AuthUserInfo } from '@/src/types/AuthTypes';

const fetchUserInfo = async (): Promise<AuthUserInfo> => {
  const { data } = await api.get('/usuario/info');
  const result = AuthUserInfoSchema.safeParse(data);

  if (!result.success) {
    throw new Error('Error al validar la información del usuario');
  }

  return result.data;
};

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: fetchUserInfo,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
