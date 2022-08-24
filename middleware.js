import {NextResponse} from 'next/server'

export function middleware(request) {
    const __etcat__ = request.cookies.get('__etcat__');

    if (request.nextUrl.pathname === '/login' ||
        request.nextUrl.pathname === '/forgot-password') {
        if (__etcat__) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (request.nextUrl.pathname === '/' ||
        request.nextUrl.pathname.startsWith('/product-category') ||
        request.nextUrl.pathname.startsWith('/product')
        ) {
        if (!__etcat__) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}
