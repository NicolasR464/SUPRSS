import { NextResponse } from 'next/server'
import { clerkMiddleware } from '@clerk/nextjs/server'

const ALLOWED_ORIGINS = [process.env.URL_FRONT]

export default clerkMiddleware((_auth, req) => {
    const origin = req.headers.get('origin') ?? ''

    // Handle CORS
    if (req.method === 'OPTIONS') {
        const res = new NextResponse(null, { status: 204 })

        if (ALLOWED_ORIGINS.includes(origin)) {
            res.headers.set('Access-Control-Allow-Origin', origin)
            res.headers.set('Vary', 'Origin')
        }

        res.headers.set(
            'Access-Control-Allow-Methods',
            'GET,POST,PUT,PATCH,DELETE,OPTIONS'
        )

        res.headers.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        )

        return res
    }

    const res = NextResponse.next()

    if (ALLOWED_ORIGINS.includes(origin)) {
        res.headers.set('Access-Control-Allow-Origin', origin)
        res.headers.set('Vary', 'Origin')
    }
    return res
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

        '/(api|trpc)(.*)',
    ],
}
