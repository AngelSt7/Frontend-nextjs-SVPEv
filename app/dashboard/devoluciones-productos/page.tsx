



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
    <div className="custom-container">
      <ContentPage user={user} id={id} />
    </div>
  )
}
