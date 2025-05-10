import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {

    const token = (await cookies()).get('AUTH_TOKEN')

    //   Obtener la ruta actual
    const path = request.nextUrl.pathname

    //   Condicionar las 2 rutas base
    const isAuthPage = path.startsWith('/auth')
    const isDashboardPage = path.startsWith('/dashboard')

    //   Condicional si no hay token
    if (!token) {
        // Si hay token pero estoy en alguna ruta del dashboard
        if (isDashboardPage) {
            return NextResponse.redirect(new URL('/auth/iniciar-sesion', request.url))
        }
        // Continuar con la aplicación
        return NextResponse.next()
    }

    // Si estoy en alguna ruta del login
    if (isAuthPage) {
        return NextResponse.redirect(new URL('/dashboard/proveedores', request.url))
    }

    return NextResponse.next()
}

// Mapeo rutas para aplicar el middleware
export const config = {
    matcher: ['/dashboard/:path*', '/auth/iniciar-sesion']
}
