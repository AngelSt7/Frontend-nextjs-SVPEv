import api from "@/src/axios/axios"
import { AuthUserInfoSchema } from "@/src/schemas/Auth";
import { isAxiosError } from "axios";
import { redirect } from "next/navigation";

type authInfoUserServiceProps = {
  shouldShowResetPasswordModal: boolean;
  toggleResetPasswordModal: () => void;
};

export async function authInfoUserService( { shouldShowResetPasswordModal, toggleResetPasswordModal }  : authInfoUserServiceProps) {
    try {
        const { data } = await api('/usuario/info')
        const response = AuthUserInfoSchema.safeParse(data)
        if (response.success) { return response.data }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            shouldShowResetPasswordModal && toggleResetPasswordModal()
            localStorage.removeItem('AUTH_TOKEN')
            redirect('/auth/iniciar-sesion')
        }
    }
}