import { backErrors } from '@/variables/messages'
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
import { ArticleSchema, FeedSchema, FeedStatus } from '@/types/feed'

export const POST = async (req: Request) => {
    console.log('POST /api/feed/import')

    const data: FeedImportPayload = await req.json()

    console.log({ data })

    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    // Check Token
    if (!token) {
        return NextResponse.json(
            { error: backErrors.MISSING_TOKEN },
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
            { error: backErrors.INVALID_TOKEN },
            {
                status: 403,
            }
        )
    }

    // CRUD to DBs
    const database = await db()
    const clerk_user_id = payload.sub

    const feedCollection = database.collection<FeedSchema>(collections.FEEDS)
    const collectionCollection = database.collection<CollectionSchema>(
        collections.COLLECTIONS
    )
    const articleCollection = database.collection<ArticleSchema>(
        collections.ARTICLES
    )
    const usersCollection = database.collection<UserSchema>(collections.USERS)

    // Create the feed (or get the feed date if already exists in DB)
    const dataFeed = data.feed

    const feedCrud = await feedCollection.findOneAndUpdate(
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

    console.log({ feed: feedCrud })

    if (!feedCrud) {
        return NextResponse.json(
            { error: backErrors.FEED_ERROR },
            {
                status: 500,
            }
        )
    }

    /// CRUD to Collection (if collection in payload and the user set a new collection)
    if (data.collection && !data.collection._id) {
        // Check if collection name is taken already
        const collectionFound = await collectionCollection.findOne({
            name: data.collection.name,
        })

        if (collectionFound) {
            return NextResponse.json(
                { error: backErrors.COLLECTION_NAME_ALREADY_TAKEN },
                {
                    status: 400,
                }
            )
        }

        // Create new collection
        const feedSetting = {
            feed_id: feedCrud?._id,
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

        const collectionCrud = await collectionCollection.insertOne(
            newCollectionData
        )

        if (!collectionCrud)
            return NextResponse.json(
                { error: backErrors.COLLECTION_ERROR },
                {
                    status: 500,
                }
            )
    }

    /// Add new articles (on conditions not found -> feedCrud.pubDate + feedCrud._id )
    const articleFound = articleCollection.findOne({
        feed_id: feedCrud._id,
        pubDate: feedCrud.pubDate,
    })

    if (!articleFound) {
        // We add the new articles
    }

    /// Update user

    // Response - Returns the updated user document
    return new Response('OK', {
        status: 200,
    })
}
