'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { RenderCellSupplier } from './RenderCellSupplier'
import { dashboardListSupplierService } from '@/src/services/dashboard/Supplier/dashboardListSupplierService'
import { DashboardSupplier } from '@/src/types/DashboardTypes'
import { dashboardChangeStatusSupplierService } from '@/src/services/dashboard/Supplier/dashboardChangeStatusSupplierService'
import { Columns } from './Columns'
import { dashboardFindByIdSupplierService } from '@/src/services/dashboard/Supplier/dashboardFindByIdSupplierService'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'

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

      {id && (
        <GenericEditWrapper
          id={id}
          closeModal={closeModal}
          serviceFunction={dashboardFindByIdSupplierService}
          queryKey="supplier"
        />
      )}

      <GenericModal closeModal={closeModal} />

    </div>
  )
}
