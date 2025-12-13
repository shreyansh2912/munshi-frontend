/**
 * Next.js Middleware
 * Route protection and authentication checks
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
    '/',
    '/login',
    '/signup',
    '/pricing',
    '/guide',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/book-demo',
    '/gst',
];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ['/login', '/signup'];

/**
 * Check if route is public
 */
function isPublicRoute(pathname: string): boolean {
    return PUBLIC_ROUTES.some(route => {
        if (route === '/') return pathname === '/';
        return pathname.startsWith(route);
    });
}

/**
 * Check if route is an auth route
 */
function isAuthRoute(pathname: string): boolean {
    return AUTH_ROUTES.some(route => pathname.startsWith(route));
}

/**
 * Check if user is authenticated
 */
function isAuthenticated(request: NextRequest): boolean {
    // Check for access token in cookies or headers
    const accessToken = request.cookies.get('munshi_access_token')?.value;
    return !!accessToken;
}

/**
 * Middleware function
 */
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow public routes
    if (isPublicRoute(pathname)) {
        // If user is authenticated and trying to access auth routes, redirect to dashboard
        if (isAuthRoute(pathname) && isAuthenticated(request)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    // Debug logging
    console.log(`[Middleware] Processing ${pathname}`);
    console.log(`[Middleware] Cookies:`, request.cookies.getAll().map(c => c.name));
    const isAuth = isAuthenticated(request);
    console.log(`[Middleware] Is Authenticated: ${isAuth}`);

    // Check authentication for protected routes
    if (!isAuth) {
        // Store the attempted URL for redirect after login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Allow authenticated users to access protected routes
    return NextResponse.next();
}

/**
 * Middleware configuration
 * Specify which routes should be processed by this middleware
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         * - api routes
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
