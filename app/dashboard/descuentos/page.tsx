

import ContentPage from '@/src/components/dashboard/discount/list/ContentPage'
import { redirect } from 'next/navigation'


export default async function page({ searchParams }: { searchParams: { id?: string, action?: string } }) {
  const { id, action } = await searchParams
  if (action && action === 'edit' ) {
    if (!id) { redirect('/dashboard/descuentos') }
  }
  return (
    <div className="custom-container">
      <ContentPage id={id} />
    </div>
  )
}
