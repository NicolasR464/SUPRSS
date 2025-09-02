import z from 'zod'
import { RssFeed } from '@/types/feed'
import { CollectionSchema } from '@/types/collection'

export const CollectionCreationPayload = CollectionSchema.omit({
    description: true,
    owner_id: true,
    created_at: true,
    chatRoom_id: true,
    feedsSettings: true,
}).extend({ _id: CollectionSchema.shape._id.optional() })

export const FeedImportPayload = z.object({
    feed: RssFeed,
    collection: CollectionCreationPayload.optional(),
})
export type FeedImportPayload = z.infer<typeof FeedImportPayload>
