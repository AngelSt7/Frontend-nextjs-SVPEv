
import ContentPage from "@/src/components/dashboard/sales/register/list/ContentPage";
import useInfoUser from "@/src/hooks/auth/useInfoUser";

export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {
  const user = await useInfoUser()
  return (
    <div className="bg-white w-[95%] max-w-[1600px] mx-auto my-3 rounded-md font-semibold border">
      <ContentPage user={user} />
    </div>
  )
}
