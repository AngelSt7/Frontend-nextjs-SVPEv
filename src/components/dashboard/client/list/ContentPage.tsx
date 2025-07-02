'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { DashboardClient } from '@/src/types/dashboard/ClientType'
import { Client } from '@/src/services/dashboard/client/Client'
import { Columns } from './Columns'
import { RenderCellClient } from './RenderCellClient'
import GenericModal from '../../ui/generics/GenericModal'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/getRenderCell'


export default function ContentPage({ id }: { id: string | undefined }) {
    const queryKey = "clients"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: Client.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardClient>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={Client.list}
                defaultVisibleColumns={["nombre", "dni", "correo", "celular", "activo", "actions"]}
                searchableField="nombre"
                renderCells={getRenderCell(RenderCellClient, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={Client.find}
                    queryKey={queryKey}
                />
            )}

            <GenericModal closeModal={closeModal} />
        </div>
    )
}