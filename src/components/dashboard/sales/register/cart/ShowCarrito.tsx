import { useAppStore } from '@/src/store/useAppStore'
import { useMemo, useEffect, useState } from 'react'
import ShowSumary from './ShowSumary'
import { useDiscountInitializer } from '@/src/hooks/dashboard/useDiscountInitializer'

export default function ShowCarrito() {
  // llenar descuentos al store
  useDiscountInitializer()

  // flujo normal
  const toggleShowModal = useAppStore(state => state.toggleShowModal)
  const cart = useAppStore(state => state.cart)
  const totalProducts = useMemo(() => cart.length, [cart])

  const [isAnimating, setIsAnimating] = useState(false)
  const [prevCount, setPrevCount] = useState(totalProducts)

  useEffect(() => {
    if (totalProducts !== prevCount) {
      setIsAnimating(true)
      setPrevCount(totalProducts)

      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [totalProducts, prevCount])

  const isDisabled = totalProducts === 0

  const handleClick = () => {
    if (!isDisabled) {
      toggleShowModal()
    }
  }

  return (
    <>
      <ShowSumary />
      
      <button 
        className={`relative inline-flex items-center transition-all duration-300 ${
          isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        onClick={handleClick}
        disabled={isDisabled}
      >
        <div className={`flex flex-col items-center rounded-lg shadow-lg pt-4 px-2 border transition-all duration-300 ${
          isDisabled 
            ? 'bg-gray-100 border-gray-300 shadow-sm' 
            : 'bg-transparent border-gray-200 hover:shadow-xl hover:border-blue-300'
        }`}>
          <div className="relative mb-2">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-colors duration-200 ${
                isDisabled 
                  ? 'text-gray-400' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="19" r="1" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="19" r="1" stroke="currentColor" strokeWidth="2" />
            </svg>
            {totalProducts > 0 && (
              <div
                className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 transform transition-all duration-300 ${isAnimating
                  ? 'scale-125 bg-red-600 shadow-lg animate-bounce'
                  : 'scale-100'
                  }`}
              >
                <span className={`transition-all duration-200 ${isAnimating ? 'animate-pulse' : ''}`}>
                  {totalProducts}
                </span>
              </div>
            )}
          </div>
        </div>
      </button>
    </>
  )
}