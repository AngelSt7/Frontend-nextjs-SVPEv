import { useAppStore } from '@/src/store/useAppStore'
import { formatCurrency } from '@/src/utils/format/formatCurrency'
import React, { useMemo } from 'react'

export default function ShowCarrito() {
    const cart = useAppStore(state => state.cart)
    const total = useMemo(()=> cart.reduce((total, item) => total + item.subtotal, 0), [cart])
    const totalProducts = useMemo(()=> cart.length  ,[total])
  return (
    <>
    <div>{formatCurrency(total)}</div>
    <p>Total de productis: {totalProducts}</p>
    </>
  )
}
