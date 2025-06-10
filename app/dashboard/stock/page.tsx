

import ContentPage from "@/src/components/dashboard/stock/list/ContentPage";
import useInfoUser from "@/src/hooks/auth/useInfoUser";
import { redirect } from "next/navigation";

export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {
  const user = await useInfoUser()
  const { id, action } = await searchParams
  if (action && action === 'edit' && user) {
    if (!id) { redirect('/dashboard/stock') }
  }
  return (
    <div className="bg-white w-[95%] max-w-[1600px] mx-auto my-3 rounded-md font-semibold border">
      <ContentPage user={user} id={id} />
    </div>
  )
}
