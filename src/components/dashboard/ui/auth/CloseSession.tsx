'use client'

import { closeSession } from '@/src/utils/resolves/closeSession'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdExit } from 'react-icons/io'


export default function CloseSession({styles}: {styles: string}) {
    const router = useRouter()
    return (
        <IoMdExit className={`${styles}`} onClick={async ()=> {
            await closeSession()
            router.replace('/auth/iniciar-sesion')
        }}/>
    )
}
