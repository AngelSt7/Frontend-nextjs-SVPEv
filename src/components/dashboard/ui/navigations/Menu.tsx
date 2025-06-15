'use client'
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { RxHamburgerMenu } from "react-icons/rx";
import Switcher from '../darkmode/SwitchMode';
import { IoMdLogOut } from 'react-icons/io';
import { User } from "@heroui/react";
import { useGetUserInfo } from '@/src/hooks/dashboard/useGetUser';

export default function Menu() {
    const { data: user } = useGetUserInfo()
    return (
        <Popover className="relative z-50 ">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-transparent">
                <RxHamburgerMenu className='w-10 h-10 text-slate-800 dark:text-slate-50 bg-[#F5F5F5] dark:bg-[#181818] p-1 rounded-xl dark:border-[#343434]' />
            </Popover.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex max-w-min -translate-x-48">
                    <div className="w-56 shrink rounded-xl bg-white dark:bg-[#181818] p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <>
                            <User
                                avatarProps={{
                                    src: "https://pbs.twimg.com/media/Fyxa8k_WIAYeOLD.jpg",
                                }}
                                description="Admin superpoderoso"
                                name={
                                    <p className=' dark:text-zinc-100'>{user?.nombre + ' ' + user?.apellido}</p>
                                }
                            />

                            <button
                                onClick={() => console.log('cerrar sesion')}
                                className='dark:text-slate-300 dark:hover:text-slate-50 text-zinc-600 p-2 flex items-center hover:text-zinc-950 focus:outline-none focus:ring-0 gap-2 w-full'
                                type='button'
                            >
                                <IoMdLogOut size={18} />
                                Cerrar Sesión
                            </button>
                            <div className='mt-2 flex justify-between'>
                                <p className=' dark:text-zinc-100'>Modo Oscuro</p>
                                <Switcher />
                            </div>
                        </>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}