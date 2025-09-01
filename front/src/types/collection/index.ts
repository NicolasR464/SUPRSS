import z from 'zod'
import { CollectionTag } from '@/types/tags'
import { ObjectId } from 'mongodb'

export const FeedUpdateInterval = z.enum([
    'EVERY_HOUR',
    'EVERY_6_HOUR',
    'EVERY_DAY',
])
export type FeedUpdateInterval = z.infer<typeof FeedUpdateInterval>

export const FeedSetting = z.object({
    feed_id: z.instanceof(ObjectId),
    update: FeedUpdateInterval.default(FeedUpdateInterval.enum.EVERY_HOUR),
})
export type FeedSetting = z.infer<typeof FeedSetting>

/** Collection Schema */
export const CollectionSchema = z.object({
    _id: z.instanceof(ObjectId).optional(),
    name: z.string(),
    description: z.string().optional(),
    tags: CollectionTag.array().optional(),
    owner_id: z.string(),
    created_at: z.date(),
    chatRoom_id: z.string(),
    feedsSettings: FeedSetting.array(),
})
export type CollectionSchema = z.infer<typeof CollectionSchema>
