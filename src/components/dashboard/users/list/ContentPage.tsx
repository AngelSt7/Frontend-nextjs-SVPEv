'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/GenericModal'
// import EditProductWrapper from '../edit/EditProductWrapper'
import useSubmitMutation from '@/src/hooks/dashboard/useSubmitMutation'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import { Columns } from './Columns'
import { dashboardListUserService } from '@/src/services/dashboard/users/dashboardListUserService'
import { DashboardUser } from '@/src/types/UserTypes'
import { dashboardChangeStatusUserService } from '@/src/services/dashboard/users/dashboardChangeStatusUserService'
import EditUserWrapper from '../edit/EditUserWrapper'

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
            />

            <GenericModal user={user} closeModal={closeModal} />
            {id && user && <EditUserWrapper closeModal={closeModal} id={id} />}
        </div>
    )
}
