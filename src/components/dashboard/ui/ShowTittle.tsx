'use client'

import { Tittles } from "@/src/utils/resolves/resolveTittle";
import { usePathname } from "next/navigation";
import ExtraContent from './ExtraContent';

export default function ShowTittle() {
    const path = usePathname()
    return (
        <div className="bg-white dark:bg-[#17171a] w-[95%] max-w-[1600px] mx-auto py-4 
        px-6 my-3 rounded-md font-semibold flex justify-between flex-col md:flex-row gap-2 items-center">
            <span className=" text-lg dark:text-white">
            {Tittles[path]}
            </span>
            <ExtraContent path={path} />
        </div>
    )
}
