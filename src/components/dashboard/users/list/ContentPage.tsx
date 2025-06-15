'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import { Columns } from './Columns'
import { dashboardListUserService } from '@/src/services/dashboard/users/dashboardListUserService'
import { DashboardUser } from '@/src/types/dashboard/UserTypes'
import { dashboardChangeStatusUserService } from '@/src/services/dashboard/users/dashboardChangeStatusUserService'
import { RenderCellUser } from './RenderCellUser'
import { dashboardFindByIdUserService } from '@/src/services/dashboard/users/dashboardFindByIdUserService'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: dashboardChangeStatusUserService,
        invalidateQuery: ["users"]
    })

    return (
        <div>
            <TableComponent<DashboardUser>
                openModalCreate={openModalCreate}
                openModalEdit={openModalEdit}
                columns={Columns}
                queryKey="users"
                functionService={dashboardListUserService}
                defaultVisibleColumns={["nombre", "dni", "correo", "celular", "activo", "actions"]}
                searchableField="nombre"
                mutate={mutate}
                renderCells={RenderCellUser}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    closeModal={closeModal}
                    serviceFunction={dashboardFindByIdUserService}
                    queryKey="user"
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />

        </div>
    )
}
