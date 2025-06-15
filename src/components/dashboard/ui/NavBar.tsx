import Link from "next/link";

export default function NavBar() {
    const styles = 'text-zinc-700 dark:text-zinc-100 font-semibold sm:hover:scale-125 sm:transition-transform text-sm md:text-base'
    const links = [
        { href: '/dashboard/usuarios', text: 'Usuarios' }, 
        { href: '/dashboard/productos', text: 'Productos' }, { href: '/dashboard/proveedores', text: 'Proveedores' },
        { href: '/dashboard/ventas', text: 'Ventas' }
    ]
    return (
        <nav className=' bg-white dark:bg-[#17171a] py-4 border-b-1 border-[#c7c7c7] dark:border-[#202020]'>
            <div className='w-[90%] max-w-[1600px] mx-auto flex justify-between xs:justify-start gap-8'>
                {links.map((link, index) => (
                    <Link key={index} href={link.href} className={`${styles} 
                        ${link.text === 'Nueva Venta' ? 'text-[#716a9c]' : ''}`} prefetch >
                        {link.text}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
