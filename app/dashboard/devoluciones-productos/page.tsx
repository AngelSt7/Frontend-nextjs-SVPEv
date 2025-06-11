



import ContentPage from '@/src/components/dashboard/return-product/list/ContentPage'
import useInfoUser from '@/src/hooks/auth/useInfoUser'
import { redirect } from 'next/navigation'

export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {
  const user = await useInfoUser()
  const { id, action } = await searchParams
  if (action && action === 'edit' ) {
    if (!id) { redirect('/dashboard/devoluciones-productos') }
  }
  return (
    <div className="bg-white w-[95%] max-w-[1600px] mx-auto my-3 rounded-md font-semibold border">
      <ContentPage user={user} id={id} />
    </div>
  )
}
