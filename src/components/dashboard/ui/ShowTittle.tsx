'use client'

import { Tittles } from "@/src/utils/resolves/resolveTittle"
import { usePathname } from "next/navigation"

export default function ShowTittle() {
    const path = usePathname()
    return (
        <div className="bg-white w-[95%] max-w-[1600px] mx-auto py-4 px-6 my-3 rounded-md font-semibold">
            {Tittles[path]}
        </div>
    )
}
