'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { Columns } from './Columns'
import { RenderCellClient } from './RenderCellClient'
import { dashboardListClientService } from '@/src/services/dashboard/client/dashboardListClientService'
import { DashboardClient } from '@/src/types/dashboard/ClientType'
import { dashboardChangeStatusClientService } from '@/src/services/dashboard/client/dashboardChangeStatusClientService'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { dashboardFindByIdClientService } from '@/src/services/dashboard/client/dashboardFindByIdClientService'
import { getRenderCell } from '../../ui/getRenderCell'


export default function ContentPage({ id }: { id: string | undefined }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusClientService,
        invalidateQuery: ["clients"]
    })

    return (
        <div>
            <TableComponent<DashboardClient>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="clients"
                functionService={dashboardListClientService}
                defaultVisibleColumns={["nombre", "dni", "correo", "celular", "activo", "actions"]}
                searchableField="nombre"
                mutate={mutate}
                renderCells={getRenderCell(RenderCellClient, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdClientService}
                    queryKey="client"
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}