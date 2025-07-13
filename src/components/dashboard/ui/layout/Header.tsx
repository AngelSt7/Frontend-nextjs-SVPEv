import Link from 'next/link';
import Menu from '../navigations/Menu';

export default function Header() {
    return (
        <header className=' bg-white dark:bg-[#17171a] py-4 border-b-1 border-[#c7c7c7] dark:border-[#202020]'>
            <div className='w-[90%] max-w-[1600px] mx-auto flex justify-between '>
                <Link href={'/dashboard/resumen'} className="uppercase font-bold cursor-pointer dark:text-white">
                    NEON
                </Link>
                <div className=' flex gap-4 ' >
                    <Menu />
                </div>
            </div>
        </header>
    )
}
