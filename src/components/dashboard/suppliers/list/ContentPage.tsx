'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import EditSupplierWrapper from '../edit/EditSupplierWrapper'
import GenericModal from '../../ui/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { RenderCellSupplier } from './RenderCellSupplier'
import { dashboardListSupplierService } from '@/src/services/dashboard/Supplier/dashboardListSupplierService'
import { DashboardSupplier } from '@/src/types/DashboardTypes'
import { dashboardChangeStatusSupplierService } from '@/src/services/dashboard/Supplier/dashboardChangeStatusSupplierService'
import { Columns } from './Columns'

export default function ContentPage({ id }: { id: string | undefined }) {
  const { openModalCreate, openModalEdit, closeModal } = useModalUtils()
  const { mutate } = useSubmitMutation({
    serviceFunction: dashboardChangeStatusSupplierService,
    invalidateQuery: ["suppliers"]
  })
  
  return (
    <div>
      <TableComponent<DashboardSupplier>
        openModalCreate={openModalCreate}
        openModalEdit={openModalEdit}
        columns={Columns}
        queryKey="suppliers"
        functionService={dashboardListSupplierService}
        defaultVisibleColumns={["razon_social", "ruc", "correo", "activo", "actions"]}
        searchableField="razon_social"
        mutate={mutate}
        renderCells={RenderCellSupplier}
        isSales={false}
      />
      <GenericModal closeModal={closeModal} />
      {id && <EditSupplierWrapper closeModal={closeModal} id={id} />}
    </div>
  )
}
