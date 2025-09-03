import { backErrors } from '@/variables/messages'
import { NextResponse } from 'next/server'
import { verifyToken } from '@clerk/nextjs/server'

import { db } from '@/utils/mongo'

import { collections } from '@/variables/collections'
import { FeedImportPayload } from '@/types/feed/payload'
import { CollectionSubscriptionRight, UserSchema } from '@/types/user'
import { CollectionSchema, FeedUpdateInterval } from '@/types/collection'

import { FeedSchema, FeedStatus } from '@/types/feed'
import { OptionalId } from 'mongodb'
import { ArticleSchema } from '@/types/article'

/** User imports a feed and optionally creates a new collection */
export const POST = async (req: Request) => {
    const data: FeedImportPayload = await req.json()

    console.log({ data })

    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    console.log({ token })

    // Check Token
    if (!token) {
        return NextResponse.json({ error: backErrors.MISSING_TOKEN })
    }

    // Verify Token
    const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
    })

    console.log({ payload })

    if (!payload.sub) {
        return NextResponse.json({ error: backErrors.INVALID_TOKEN })
    }

    // CRUD to DBs
    const database = await db()

    if (!database) {
        return NextResponse.json({
            error: backErrors.DATABASE_CONNECTION_ERROR,
        })
    }

    const clerk_user_id = payload.sub

    const feedCollection = database.collection<FeedSchema>(collections.FEEDS)

    const collectionCollection = database.collection<
        OptionalId<CollectionSchema>
    >(collections.COLLECTIONS)

    const articleCollection = database.collection<OptionalId<ArticleSchema>>(
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
                    description: dataFeed.description,
                }),
                ...(dataFeed.pubDate && {
                    pubDate: dataFeed.pubDate,
                }),
                ...(dataFeed.link && {
                    link: dataFeed.link,
                }),
                ...(dataFeed.language && {
                    language: dataFeed.language,
                }),
                ...(dataFeed.copyright && {
                    copyright: dataFeed.copyright,
                }),
                ...(dataFeed.image && {
                    image: dataFeed.image,
                }),

                status: FeedStatus.enum.ACTIVE,
            },
        },
        { upsert: true, returnDocument: 'after' }
    )

    console.log({ feedCrud })

    if (!feedCrud) {
        return NextResponse.json({ error: backErrors.FEED_ERROR })
    }

    /// CRUD to Collection (if collection in payload and the user set a new collection)
    let collectionCrud

    if (data.collection) {
        // If new collection to add
        if (!data.collection._id) {
            // Check if collection name is taken already
            const collectionFound = await collectionCollection.findOne({
                name: data.collection.name,
            })

            if (collectionFound) {
                return NextResponse.json({
                    error: backErrors.COLLECTION_NAME_ALREADY_TAKEN,
                })
            }

            // Create new collection
            const feedSetting = {
                feed_id: feedCrud?._id,
                update: FeedUpdateInterval.enum.EVERY_HOUR,
            }

            const newCollectionData = {
                name: data.collection.name,
                owner_id: clerk_user_id,
                created_at: new Date(),
                chatRoom_id: crypto.randomUUID(),
                feedsSettings: [feedSetting],
                ...(data.collection.tags && {
                    tags: data.collection.tags,
                }),
            }

            collectionCrud = await collectionCollection.insertOne(
                newCollectionData
            )
        }

        // If collection already exists
        if (data.collection._id) {
            collectionCrud = await collectionCollection.findOneAndUpdate(
                {
                    _id: data.collection._id,
                },
                {
                    $push: {
                        feedsSettings: {
                            $each: [
                                {
                                    feed_id: feedCrud?._id,
                                    update: FeedUpdateInterval.enum.EVERY_HOUR,
                                },
                            ],
                        },
                    },
                },
                { returnDocument: 'after', upsert: true }
            )
        }

        if (!collectionCrud)
            return NextResponse.json({ error: backErrors.COLLECTION_ERROR })
    }

    /// Add new articles (on conditions not found -> feedCrud.pubDate + feedCrud._id )
    const articleFound = await articleCollection.findOne({
        guid: data?.feed?.items?.[0]?.guid,
    })

    console.log({ articleFound })

    if (!articleFound && feedCrud._id) {
        // We add the new articles
        const articles = data.feed.items.map((item) => ({
            ...item,
            feed_id: feedCrud._id,
        }))

        const articlesCrud = await articleCollection.insertMany(articles)

        console.log({ articlesCrud })

        if (!articlesCrud)
            return NextResponse.json({ error: backErrors.ARTICLE_ERROR })
    }

    /// Update user (update feedSubscription + collectionsSubscriptions)

    // Update user feedSubscriptions

    let userUpdated

    if (feedCrud._id) {
        console.log('clerk_user_id', clerk_user_id)

        const userFeedCrud = await usersCollection.findOneAndUpdate(
            { clerk_user_id },
            {
                $push: {
                    feedSubscriptions: feedCrud._id,
                },
            },
            { returnDocument: 'after', upsert: true }
        )

        console.log({ userFeedCrud })

        if (!userFeedCrud) {
            return NextResponse.json({ error: backErrors.USER_ERROR })
        }

        userUpdated = userFeedCrud
    }

    // Update user collectionsSubscriptions
    if (
        !data.collection?._id &&
        data?.collection?.name &&
        collectionCrud &&
        'insertedId' in collectionCrud
    ) {
        const newCollectionToAdd = {
            collection_id: collectionCrud.insertedId,
            name: data.collection.name,
            right: CollectionSubscriptionRight.enum.ADMIN,
        }

        const userCollectionCrud = await usersCollection.findOneAndUpdate(
            { clerk_user_id },
            {
                $push: {
                    collectionsSubscriptions: newCollectionToAdd,
                },
            },
            { returnDocument: 'after', upsert: true }
        )

        if (!userCollectionCrud) {
            return NextResponse.json({ error: backErrors.USER_ERROR })
        }

        userUpdated = userCollectionCrud
    }

    // Response - Returns the updated user document
    return NextResponse.json(userUpdated, {
        status: 201,
    })
}
