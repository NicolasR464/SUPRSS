import { NextResponse } from 'next/server'

import { db } from '@/utils/mongo'

import { collections } from '@/variables/collections'
import { errors } from '@/variables/messages'
import { verifyToken } from '@clerk/nextjs/server'
import { UserSchema } from '@/types/user'

export const GET = async (req: Request) => {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    // Check Token
    if (!token) {
        return NextResponse.json(
            { error: errors.MISSING_TOKEN },
            {
                status: 401,
            }
        )
    }

    // Verify Token
    const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
    })

    if (!payload.sub) {
        return NextResponse.json(
            { error: errors.INVALID_TOKEN },
            {
                status: 403,
            }
        )
    }

    // CRUD to DB
    const clerk_user_id = payload.sub

    const database = await db()

    const usersCollection = database.collection<UserSchema>(collections.USERS)

    const userUpdated = await usersCollection.findOneAndUpdate(
        { clerk_user_id },
        {
            $setOnInsert: {
                clerk_user_id,
            },
        },
        { upsert: true, returnDocument: 'after' }
    )

    // Return Response
    if (!userUpdated) {
        return new Response(JSON.stringify({ error: errors.SERVER_ERROR }), {
            status: 500,
        })
    }

    return NextResponse.json(userUpdated, {
        status: 200,
    })
}

/** Update user data */
export const PUT = async (req: Request) => {
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    // Check Token
    if (!token) {
        return NextResponse.json(
            { error: errors.MISSING_TOKEN },
            {
                status: 401,
            }
        )
    }

    // Verify Token
    const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
    })

    if (!payload.sub) {
        return NextResponse.json(
            { error: errors.INVALID_TOKEN },
            {
                status: 403,
            }
        )
    }

    // CRUD to DB
    const clerk_user_id = payload.sub

    const userData: Partial<UserSchema> = await req.json()

    const database = await db()

    const usersCollection = database.collection<UserSchema>(collections.USERS)

    const result = await usersCollection.findOneAndUpdate(
        { clerk_user_id },
        {
            $set: {
                ...userData,
            },
        },
        { returnDocument: 'after' }
    )

    // Return Response
    if (!result) {
        return NextResponse.json(
            { error: errors.SERVER_ERROR },
            {
                status: 500,
            }
        )
    }

    return NextResponse.json(
        { user: result },
        {
            status: 200,
        }
    )
}
