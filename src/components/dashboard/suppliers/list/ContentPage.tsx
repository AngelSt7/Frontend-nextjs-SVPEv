'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import EditSupplierWrapper from '../edit/EditSupplierWrapper'
import GenericModal from '../../ui/GenericModal'
import { Columns } from './Columns'
import { DashboardSupplier } from "@/src/types/DashboardTypes"
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { dashboardChangeStatusSupplierService } from '@/src/services/dashboard/supplier/dashboardChangeStatusSupplierService'
import { RenderCellSupplier } from './RenderCellSupplier'
import { dashboardListSupplierService } from '@/src/services/dashboard/Supplier/dashboardListSupplierService'

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
      />
      <GenericModal closeModal={closeModal} />
      {id && <EditSupplierWrapper closeModal={closeModal} id={id} />}
    </div>
  )
}
