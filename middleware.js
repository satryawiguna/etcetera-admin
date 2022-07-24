import {NextResponse} from 'next/server'

export function middleware(request) {
    const __etc__ = request.cookies.get('__etc__');

    if (request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/forgot-password') {
        if (__etc__) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (request.nextUrl.pathname === '/') {
        if (!__etc__) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}
