import ContentSuppliers from "@/src/components/dashboard/proveedores/list/ContentSuppliers";

export default async function page() {
  return (
    <div className="bg-white w-[95%] max-w-[1600px] mx-auto my-3 rounded-md font-semibold border">
      <ContentSuppliers />
    </div>
  )
}
