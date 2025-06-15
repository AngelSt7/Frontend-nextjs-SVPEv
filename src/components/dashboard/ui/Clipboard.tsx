import toast from 'react-hot-toast'

export default function Clipboard({ text, context, opacity = true }: { text: string, context: string, opacity?: boolean }) {
    return (
        <button
            className={`flex items-center gap-1 p-1 rounded hover:bg-gray-100 dark:hover:bg-transparent transition-colors duration-200 ${opacity ? 'opacity-60 group-hover:opacity-100' : ''}`}
            onClick={() => {
                navigator.clipboard.writeText(text);
                toast.success(`${context} copiado al portapapeles`);
            }}
            title={`Copiar ${context.toLowerCase()}`}
        >
            <span className="text-sm text-[#11181c] dark:text-[#c9cacb]">{text}</span>
            <svg
                className="w-4 h-4 text-gray-500 hover:text-zinc-100"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
            </svg>
        </button>
    );
}
