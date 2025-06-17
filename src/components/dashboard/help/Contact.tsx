import React from 'react'
import { FiHeadphones } from 'react-icons/fi'

export default function Contact() {
    return (
        <div className="mt-12 text-center">
            <div className="relative overflow-hidden rounded-xl border border-divider bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950/30 dark:to-indigo-950/30 dark:bg-gray-900/80">
            
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/10 dark:via-transparent dark:to-purple-400/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-400/10 dark:from-blue-300/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/10 dark:from-purple-300/20 rounded-full blur-2xl"></div>

                <div className="relative p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center shadow-lg">
                        <FiHeadphones className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        ¿No encuentras lo que buscas?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                        Nuestro equipo de soporte está aquí para ayudarte con cualquier consulta
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="https://wa.me/960856003"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <FiHeadphones className="w-5 h-5" />
                            Contactar Soporte
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
