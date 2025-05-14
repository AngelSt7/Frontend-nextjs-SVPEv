import api from "@/src/axios/axios"
import { AuthUserInfoSchema } from "@/src/schemas/Auth"
import { isAxiosError } from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function useInfoUser() {
  try {
    const cookieStore = cookies()
    const cookie = (await cookieStore).get("AUTH_TOKEN")?.value

    if (!cookie) {
      return redirect("/auth/iniciar-sesion")
    }

    const { data } = await api("/usuario/info", {
      headers: { Authorization: `Bearer ${cookie}`},
    })

    const response = AuthUserInfoSchema.safeParse(data)

    if (response.success) {
      return response.data
    } 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    } 
  }
}
