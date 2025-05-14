import api from "@/src/axios/axios"
import { AuthUserInfoSchema } from "@/src/schemas/Auth"
import { isAxiosError } from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function useInfoUser() {
    try {
        const cookieStore = cookies()
        const cookie = (await cookieStore).get('AUTH_TOKEN')
        if (!cookie) { return redirect('/auth/iniciar-sesion') }

        const { data } = await api('/usuario/info', {
            headers: {
                Authorization: `Bearer ${cookie?.value}`
            }
        })

        const response = AuthUserInfoSchema.safeParse(data)
        if (response.success) {
            return {
                id: response.data.id,
                name: response.data.nombre,
                apellido: response.data.apellido,
                correo: response.data.correo
            }
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}