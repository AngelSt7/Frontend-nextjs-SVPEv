import Link from 'next/link';
import { FaRegUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import CloseSession from './CloseSession';

export default function Header() {
    const styles = 'text-2xl hover:scale-125 transition-transform'
    return (
        <header className=' bg-white py-4 border-b-1 border-[#c7c7c7]'>
            <div className='w-[90%] max-w-[1600px] mx-auto flex justify-between'>
                <Link href={'/dashboard/resumen'} className="uppercase font-bold cursor-pointer">Neon</Link>
                <div className=' flex gap-4'>
                    <FaRegUser className={`${styles}`} />
                   <CloseSession styles={`${styles}`} />
                </div>
            </div>
        </header>
    )
}
