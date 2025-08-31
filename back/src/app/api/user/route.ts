import { verifyToken } from '@clerk/nextjs/server'

export const GET = async (req: Request) => {
    console.log('🔥 GET USER')

    console.log(req)
    // Grab the JWT from the Authorization header
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
        return new Response(JSON.stringify({ error: 'Missing token' }), {
            status: 401,
        })
    }

    const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
    })

    console.log('✅ Token payload:', payload)

    if (payload.sub) {
        // TODO : check send user data from Mongo to the front
    }
}
