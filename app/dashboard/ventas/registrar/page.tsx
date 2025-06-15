
import ContentPage from "@/src/components/dashboard/sales/register/list/ContentPage";
import useInfoUser from "@/src/hooks/auth/useInfoUser";

export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {
  const user = await useInfoUser()
  return (
    <div className="custom-container">
      <ContentPage user={user} />
    </div>
  )
}
