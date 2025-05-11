import ContentPage from "@/src/components/dashboard/proveedores/list/ContentPage";
import { redirect } from "next/navigation";

export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {
  const { id, action } = await searchParams
  if(action && action === 'edit'){
    if(!id){ 
      redirect('/dashboard/proveedores')
    }
  }
  return (
    <div className="bg-white w-[95%] max-w-[1600px] mx-auto my-3 rounded-md font-semibold border">
      <ContentPage id={id} />
    </div>
  )
}
