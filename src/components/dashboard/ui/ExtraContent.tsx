import ShowCarrito from '../sales/register/cart/ShowCarrito';
import Navigation from './navigations/Navigation';

export default function ExtraContent({ path }: { path: string }) {

    const renderExtraContent = () => {
        switch (path) {
            case '/dashboard/ventas/registrar':
                return <ShowCarrito />;
            case '/dashboard/ventas':
                return (<>
                    <Navigation link="/dashboard/ventas/registrar" text="Registrar" />
                    <Navigation link="/dashboard/devoluciones-ventas" text="Devoluciones" />
                </>)
            case '/dashboard/productos':
                return (<>
                    <Navigation link="/dashboard/categorias" text="Categorias" />
                    <Navigation link="/dashboard/stock" text="Stock" />
                </>)
            case '/dashboard/categorias':
                return (<>
                    <Navigation link="/dashboard/productos" text="Productos" />
                    <Navigation link="/dashboard/descuentos" text="Descuentos" />
                </>)
            case '/dashboard/stock':
                return (<>
                    <Navigation link="/dashboard/productos" text="Productos" />
                    <Navigation link="/dashboard/devoluciones-productos" text="Devoluciones" />
                </>)
            case '/dashboard/devoluciones-productos':
                return <Navigation link="/dashboard/stock" text="Stock" />
            case '/dashboard/usuarios':
                return <Navigation link="/dashboard/clientes" text="Clientes" />
            case '/dashboard/clientes':
                return <Navigation link="/dashboard/usuarios" text="Usuarios" />
            default:
                return null;
        }
    };

    return (
        <div className='flex gap-4 items-center'>
            {renderExtraContent()}
        </div>
    )
}
