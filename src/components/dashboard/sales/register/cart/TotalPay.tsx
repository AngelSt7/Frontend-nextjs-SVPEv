import { formatCurrency } from '@/src/utils/format/formatCurrency'
import React from 'react'

export default function TotalPay({ total } : { total: number }) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500 mt-1">
                        Igv aplicado
                    </p>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Total a Pagar
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 mt-1">
                        S/. {(total * .18).toFixed(2)}
                    </div>
                    <div className="text-3xl font-bold text-blue-700">
                        {formatCurrency(total * 1.18)}
                    </div>
                </div>
            </div>
        </div>
    )
}
