'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import { Columns } from './Columns'
import { DashboardUser } from '@/src/types/dashboard/UserTypes'
import { RenderCellUser } from './RenderCellUser'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { User } from '@/src/services/dashboard/users/User'

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const queryKey = "users"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: User.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardUser>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={User.list}
                defaultVisibleColumns={["nombre", "dni", "correo", "celular", "activo", "actions"]}
                searchableField="nombre"
                renderCells={getRenderCell(RenderCellUser, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={User.find}
                    queryKey="user"
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />

        </div>
    )
}
