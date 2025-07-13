import Header from '@/src/components/dashboard/ui/layout/Header';
import ShowTittle from '@/src/components/dashboard/ui/layout/ShowTittle';
import NavBar from '@/src/components/dashboard/ui/navigations/NavBar';

export default async function layout({ children }: { children: React.ReactNode }) {

    return (
        <div className=' bg-gray-100 dark:bg-[#101015] min-h-screen pb-5'>
            <Header />
            <NavBar />
            <ShowTittle />
            {children}
        </div>
    )
}