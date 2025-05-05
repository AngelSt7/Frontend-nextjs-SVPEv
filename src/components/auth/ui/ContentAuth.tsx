import React from 'react'
import Gradient from '@/src/components/ui/Gradient'

type ContentAuthProps = {
    tittle: string,
    message: string,
    window: string
    children: React.ReactNode
}

export default function ContentAuth({ tittle, children, message, window }: ContentAuthProps) {
    return (
        <>
            <div className='  my-8 md:mt-20'><Gradient>{tittle}</Gradient></div>
            <div className=' flex flex-col flex-1 '>
                <h1 className=' text-zinc-900 font-semibold text-2xl md:text-3xl my-3'>{window}</h1>
                <p className=' text-sm md:text-base'>{message}</p>
                <div className=' flex flex-col flex-1 md:flex-none md:min-h-[400px]'>
                    {children}
                </div>
            </div>
        </>
    )
}
