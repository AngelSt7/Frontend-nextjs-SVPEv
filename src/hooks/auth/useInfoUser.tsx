import api from "@/src/axios/axios"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"

export default async function useInfoUser() {
    const cookieStore = cookies()
    const token = (await cookieStore).get('AUTH_TOKEN')

    const { data: user } = await api.get('/user/me', {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (user) { redirect(notFound()) }
    if (user.clave_cambiada === false) { redirect('/auth/cambiar-contrasena') }
    return { user }
}