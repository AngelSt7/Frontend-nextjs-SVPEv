// src/hooks/useDiscountInitializer.ts
import { useEffect } from 'react'
import { useGetDiscounts } from '../data/useGetDiscounts'
import { useAppStore } from '@/src/store/useAppStore'
import { Discount } from '@/src/types/dashboard/SaleTypes'

export function useDiscountInitializer() {
    const discounts = useGetDiscounts()
    const setDiscounts = useAppStore(state => state.setDiscounts)

    const formatDiscounts = discounts?.map(discount => discount.activo === 1 && ({
        nombreCategoria: discount.nombreCategoria,
        porcentaje: discount.porcentaje
    }))

    useEffect(() => {
        if (discounts) {
            setDiscounts(formatDiscounts as Discount[])
        }
    }, [discounts, setDiscounts, formatDiscounts])
}
