'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { RenderCellSupplier } from './RenderCellSupplier'
import { DashboardSupplier } from '@/src/types/DashboardTypes'
import { Columns } from './Columns'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { Supplier } from '@/src/services/dashboard/supplier/Supplier'

export default function ContentPage({ id }: { id: string | undefined }) {
  const queryKey = "suppliers"
  
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils()
  const { mutate } = useSubmitMutation({
    serviceFunction: Supplier.changeStatus,
    invalidateQuery: [queryKey]
  })

  return (
    <div>
      <TableComponent<DashboardSupplier>
        openModalCreate={openModalCreate}
        columns={Columns}
        queryKey={queryKey}
        functionService={Supplier.list}
        defaultVisibleColumns={["razon_social", "ruc", "correo", "activo", "actions"]}
        searchableField="razon_social"
        renderCells={getRenderCell(RenderCellSupplier, mutate, openModalEdit)}
        isSales={false}
      />

      {id && (
        <GenericEditWrapper
          id={id}
          closeModal={closeModal}
          serviceFunction={Supplier.find}
          queryKey="supplier"
        />
      )}

      <GenericModal closeModal={closeModal} />

    </div>
  )
}
