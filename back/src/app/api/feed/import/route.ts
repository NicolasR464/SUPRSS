import { errors } from '@/variables/messages'
import { NextResponse } from 'next/server'
import { verifyToken } from '@clerk/nextjs/server'

import { db } from '@/utils/mongo'

import { collections } from '@/variables/collections'
import { FeedImportPayload } from '@/types/feed/payload'
import { UserSchema } from '@/types/user'
import {
    CollectionSchema,
    FeedSetting,
    FeedUpdateInterval,
} from '@/types/collection'
import z from 'zod'
import { FeedSchema, FeedStatus } from '@/types/feed'

export const POST = async (req: Request) => {
    console.log('POST /api/feed/import')

    const data: FeedImportPayload = await req.json()

    console.log({ data })

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

    // CRUD to DBs
    const database = await db()
    const usersCollection = database.collection<UserSchema>(collections.USERS)

    const clerk_user_id = payload.sub

    // Import the feed (or get the feed id if already exists)

    const feedCollection = database.collection<FeedSchema>(collections.FEEDS)

    const dataFeed = data.feed

    const feed = await feedCollection.findOneAndUpdate(
        { feedUrl: data.feed.feedUrl }, // lookup
        {
            $setOnInsert: {
                feedUrl: dataFeed.feedUrl,
                title: dataFeed.title,
                ...(dataFeed.description && {
                    description: dataFeed.description ?? '',
                }),
                ...(dataFeed.pubDate && {
                    pubDate: dataFeed.pubDate,
                }),
                ...(dataFeed.link && {
                    link: dataFeed.link ?? '',
                }),
                ...(dataFeed.language && {
                    language: dataFeed.language ?? '',
                }),
                ...(dataFeed.copyright && {
                    copyright: dataFeed.copyright ?? '',
                }),
                ...(dataFeed.image && {
                    image: dataFeed.image,
                }),

                status: FeedStatus.enum.ACTIVE,
            },
        },
        { upsert: true, returnDocument: 'after' }
    )

    console.log({ feed })

    if (!feed) {
        return NextResponse.json(
            { error: errors.FEED_ERROR },
            {
                status: 500,
            }
        )
    }

    /// CRUD to Collection (if collection in payload and the user set a new collection)
    if (data.collection && !data.collection.id) {
        // Create new collection
        const collectionCollection = database.collection<CollectionSchema>(
            collections.COLLECTIONS
        )

        const feedSetting = {
            feed_id: feed?._id,
            update: FeedUpdateInterval.enum.EVERY_HOUR,
        }

        const newCollectionData: CollectionSchema = {
            name: data.collection.name,
            owner_id: clerk_user_id,
            created_at: new Date(),
            chatRoom_id: crypto.randomUUID(),
            feedsSettings: [feedSetting],
            ...(data.collection.tags && {
                tags: data.collection.tags,
            }),
        }

        const newCollection = await collectionCollection.insertOne(
            newCollectionData
        )

        console.log({ newCollection })
    }

    /// Create new feed if not exists (check feedUrl exists in DB  already)

    /// Add new articles (on conditions)

    /// Update user

    // Response
    return new Response('OK', {
        status: 200,
    })
}
