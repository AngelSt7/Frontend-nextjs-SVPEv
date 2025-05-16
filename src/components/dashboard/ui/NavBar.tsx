import Link from "next/link";

export default function NavBar() {
    const styles = 'text-zinc-700 font-semibold sm:hover:scale-125 sm:transition-transform text-sm'
    const links = [
        { href: '#', text: 'Resumen' }, { href: '/dashboard/usuarios', text: 'Usuarios' }, 
        { href: '/dashboard/productos', text: 'Productos' }, { href: '/dashboard/proveedores', text: 'Proveedores' },
    ]
    return (
        <nav className=' bg-white py-4 border-b-1 border-[#c7c7c7]'>
            <div className='w-[90%] max-w-[1600px] mx-auto flex justify-between xs:justify-start gap-8'>
                {links.map((link, index) => (
                    <Link key={index} href={link.href} className={styles} prefetch>
                        {link.text}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
