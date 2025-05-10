import Header from '@/src/components/dashboard/ui/Header';
import NavBar from '@/src/components/dashboard/ui/NavBar';
import ShowTittle from '@/src/components/dashboard/ui/ShowTittle';
import useInfoUser from '@/src/hooks/auth/useInfoUser';

export default async function layout({ children }: { children: React.ReactNode }) {
    // const { user } = await useInfoUser()
    return (
        <div className=' bg-gray-100 h-screen'>
            <Header />
            <NavBar />
            <ShowTittle />
            {children}
        </div>
    )
}