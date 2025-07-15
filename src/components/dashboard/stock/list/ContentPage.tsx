'use client'

import { TableComponent } from '@/src/components/dashboard/ui/table/TableContent'
import { useModalUtils } from '@/src/hooks/modal/useModalUtils'
import GenericModal from '../../ui/generics/GenericModal'
import { Columns } from './Columns'
import useSubmitMutation from '@/src/hooks/dashboard/mutations/useSubmitMutation'
import { AuthUserInfo } from '@/src/types/AuthTypes'
import { RenderCellStock } from './RenderCellStock'
import GenericEditWrapper from '../../ui/generics/GenericEditWrapper'
import { getRenderCell } from '../../ui/table/getRenderCell'
import { Stock } from '@/src/services/dashboard/stock/Stock'
import { DashboardStock } from '@/src/types/dashboard/StockTypes';

export default function ContentPage({ id, user }: { id: string | undefined, user?: AuthUserInfo }) {
    const queryKey = "stocks"
    const { openModalCreate, openModalEdit, closeModal } = useModalUtils()

    const { mutate } = useSubmitMutation({
        serviceFunction: Stock.changeStatus,
        invalidateQuery: [queryKey]
    })

    return (
        <div>
            <TableComponent<DashboardStock>
                openModalCreate={openModalCreate}
                columns={Columns}
                queryKey={queryKey}
                functionService={Stock.list}
                defaultVisibleColumns={["proveedor", "codigo_ingreso", "lote", "tipo_documento", "numero_documento", "activo", "actions"]}
                searchableField="numero_documento"
                renderCells={getRenderCell(RenderCellStock, mutate, openModalEdit)}
            />

            {id && (
                <GenericEditWrapper
                    id={id}
                    user={user}
                    closeModal={closeModal}
                    serviceFunction={Stock.find}
                    queryKey="stock"
                />
            )}

            <GenericModal user={user} closeModal={closeModal} />

        </div>
    )
}