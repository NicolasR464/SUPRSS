import { backErrors } from '@/variables/messages'
import { verifyToken } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/utils/mongo'
import { collections } from '@/variables/collections'
import { CollectionSchema, FeedSetting } from '@/types/collection'
import { ArticleSchema } from '@/types/article'
import { ObjectId } from 'mongodb'

export const GET = async (
    req: Request,
    { params }: { params: { id: string } }
) => {
    // Auth header
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
        return NextResponse.json(
            { error: backErrors.MISSING_TOKEN },
            { status: 401 }
        )
    }

    // Verify token
    const payload = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY!,
    })
    if (!payload?.sub) {
        return NextResponse.json(
            { error: backErrors.INVALID_TOKEN },
            { status: 403 }
        )
    }

    // Validate id
    const { id: collectionID } = params
    if (!ObjectId.isValid(collectionID)) {
        return NextResponse.json(
            { error: 'Invalid collection id' },
            { status: 400 }
        )
    }
    const _id = new ObjectId(collectionID)

    // DB
    const database = await db()
    const collectionCol = database.collection(collections.COLLECTIONS)
    const articleCol = database.collection<ArticleSchema>(collections.ARTICLES)

    // Collection
    const collection = await collectionCol.findOne({ _id })
    if (!collection) {
        return NextResponse.json(
            { error: 'Collection not found' },
            { status: 404 }
        )
    }

    // Articles (by feed_ids from collection)
    const feedIds = (collection.feedsSettings ?? [])
        .map((feed: FeedSetting) => feed.feed_id)
        .filter(Boolean)
    const articles = feedIds.length
        ? await articleCol.find({ feed_id: { $in: feedIds } }).toArray()
        : []

    // Chat payload
    const chat = {
        room_id: collection.chatRoom_id,
        collection_id: collection._id,
    }

    return NextResponse.json({ collection, articles, chat }, { status: 200 })
}
