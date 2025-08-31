import z from 'zod'
import { CollectionTag } from './tags'

export const FeedUpdateInterval = z.enum([
    'EVERY_HOUR',
    'EVERY_6_HOUR',
    'EVERY_DAY',
])
export type FeedUpdateInterval = z.infer<typeof FeedUpdateInterval>

export const FeedSetting = z.object({
    feed_id: z.string(),
    update: FeedUpdateInterval,
})
export type FeedSetting = z.infer<typeof FeedSetting>

/** Collection Schema */
export const CollectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    tags: CollectionTag.array(),
    owner_id: z.string(),
    created_at: z.date(),
    chatRoom_id: z.string(),
    feedsSettings: FeedSetting.array(),
})
export type CollectionSchema = z.infer<typeof CollectionSchema>
