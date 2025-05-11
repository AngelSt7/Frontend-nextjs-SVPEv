'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import EditSupplierWrapper from '../edit/EditSupplierWrapper'
import GenericModal from '../../ui/GenericModal'

export default function ContentPage({ id }: { id: string | undefined }) {
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils()
  return (
    <div>
      <TableComponent openModalCreate={openModalCreate} openModalEdit={openModalEdit} />
      <GenericModal closeModal={closeModal} />
      { id && <EditSupplierWrapper closeModal={closeModal} id={id} /> }
    </div>
  )
}
