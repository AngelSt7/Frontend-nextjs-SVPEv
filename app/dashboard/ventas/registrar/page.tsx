
import ContentPage from "@/src/components/dashboard/sales/register/list/ContentPage";

export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {

  return (
    <div className="custom-container">
      <ContentPage />
    </div>
  )
}
