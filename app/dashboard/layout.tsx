import Header from '@/src/components/dashboard/ui/Header';
import NavBar from '@/src/components/dashboard/ui/NavBar';
import ShowTittle from '@/src/components/dashboard/ui/ShowTittle';

export default async function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=' bg-gray-100 h-screen'>
            <Header />
            <NavBar />
            <ShowTittle />
            {children}
        </div>
    )
}