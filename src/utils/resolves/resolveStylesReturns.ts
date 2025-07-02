export const resolveStylesReturns = ( isActive: boolean ) : string => {
    return `flex w-fit rounded-xl p-2 transition-all duration-200 cursor-pointer select-none relative overflow-hidden  ${isActive ? "dark:bg-[#f5a524] bg-[#8882ad] shadow-md" : "bg-gray-300 dark:bg-[#28282b] opacity-75"}`
}