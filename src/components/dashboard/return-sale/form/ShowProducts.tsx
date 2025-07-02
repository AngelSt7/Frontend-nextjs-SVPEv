import { Dispatch, SetStateAction } from 'react';
import { InitialState } from './ShowProductsReturns';
import { useControlReturns } from '@/src/hooks/dashboard/useControlReturns';
import { resolveStylesReturns } from '@/src/utils/resolves/resolveStylesReturns';

type ShowProductsProps = {
  product: { id_producto: number; nombre: string; cantidad: number;};
  productReturn: InitialState;
  setProductReturn: Dispatch<SetStateAction<InitialState>>
};

export default function ShowProducts({ product, setProductReturn, productReturn }: ShowProductsProps) {

  const { handleIncrease, handleDecrease, currentQuantity } = useControlReturns({product, setProductReturn, productReturn});
  
  const isActive = currentQuantity > 0;
  const styles = resolveStylesReturns(isActive);

  return (
    <div className={`${styles} group`}>
      <div
        className="absolute left-0 top-0 w-1/2 h-full z-10 hover:bg-gradient-to-r hover:from-red-200/30 hover:to-transparent transition-all duration-200"
        onClick={handleDecrease}
      />
      
      <div
        className="absolute right-0 top-0 w-1/2 h-full z-10 hover:bg-gradient-to-l hover:from-blue-200/30 hover:to-transparent transition-all duration-200"
        onClick={handleIncrease}
      />
      
      <div className="text-xs text-center relative z-0 pointer-events-none">
        <p className={`font-bold  ${isActive ? 'dark:text-zinc-800 text-[#dde2e9]' : 'text-gray-500'}`}>
          Cantidad disponible:
          <span className={`font-bold ml-1 ${isActive ? 'dark:text-zinc-800 text-[#dde2e9]' : 'text-gray-500'}`}>
            {product.cantidad}
          </span>
        </p>
        <p className={`font-normal ${isActive ? 'dark:text-zinc-900 text-[#d4d4e4]' : 'text-gray-400'}`}>
          {product.nombre}
        </p>
        
        {currentQuantity > 0 && (
          <div className="mt-1 px-2 py-1 bg-black/10 rounded-full">
            <span className="text-xs font-bold text-white dark:text-slate-200">
              Seleccionado: {currentQuantity}
            </span>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-red-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-400/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
}