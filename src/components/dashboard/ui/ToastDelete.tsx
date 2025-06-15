import { toast } from 'react-hot-toast';

type ToastDeleteProps = {
  message: string
  name: string
  onConfirm: () => void
}
export function ToastDelete({ message, onConfirm, name } : ToastDeleteProps ) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white dark:bg-zinc-900 shadow-lg rounded-lg pointer-events-auto flex overflow-hidden ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-1.5 bg-red-500"></div>
      
      <div className="flex-1 flex items-start p-4">
        <div className="flex-shrink-0 mr-3">
          <svg 
            className="w-6 h-6 text-red-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {message} <span className='font-semibold '>{`${name}`}
              </span>? Se marcará como <span className='font-semibold '>inactivo </span> 
              hasta una nueva actualización.
          </p>
        </div>
      </div>
      
      <div className="flex flex-col  justify-center gap-3 border-l border-gray-200 dark:border-zinc-700 px-4 py-2">
        <button
          onClick={() => {
            onConfirm();
            toast.dismiss(t.id);
          }}
          className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors"
        >
          Confirmar
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
          }}
          className="text-sm font-medium text-red-700 hover:text-red-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  ));
}