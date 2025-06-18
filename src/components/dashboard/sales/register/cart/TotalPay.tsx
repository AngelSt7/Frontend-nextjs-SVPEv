import { formatCurrency } from '@/src/utils/format/formatCurrency'

export default function TotalPay({ total, igv }: { total: number, igv: number }) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-zinc-900 border border-blue-200 dark:border-[#202020] rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Igv aplicado
                    </p>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                        Total a Pagar
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        S/. {(igv).toFixed(2)}
                    </div>
                    <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                        {formatCurrency(total)}
                    </div>
                </div>
            </div>
        </div>
    )
}