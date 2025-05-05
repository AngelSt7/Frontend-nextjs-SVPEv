export default function Gradient({ children }: { children: React.ReactNode }) {
    return (
        <div className=' flex gap-3 justify-center text-center'>
            <h1 className=" bg-clip-text text-transparent bg-[linear-gradient(74deg,#4285f4_0%,#9b72cb_33%,#d96570_66%,#4285f4_100%)] relative mx-0 max-w-[43.5rem] text-balance font-bold tracking-tighter text-center xs:text-center text-5xl sm:text-7xl md:text-7xl lg:text-7xl">
                {children}
            </h1>
        </div>
    )
}
