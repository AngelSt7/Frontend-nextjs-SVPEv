import api from "@/src/axios/axios";
import { AuthInitPassword } from "@/src/types/AuthTypes";
import { isAxiosError } from "axios";

type authInitPasswordServiceProps = {
    formData: AuthInitPassword,
    shouldShowResetPasswordModal: boolean;
    toggleResetPasswordModal: () => void;
}

export async function authInitPasswordService({formData, shouldShowResetPasswordModal, toggleResetPasswordModal}: authInitPasswordServiceProps) {
    try {
        const url = '/autenticacion/cambiar-clave'
        const { data } = await api.put(url, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            shouldShowResetPasswordModal && toggleResetPasswordModal()
            localStorage.removeItem('AUTH_TOKEN')
            throw new Error(error.response.data.error);
        }
    }
}