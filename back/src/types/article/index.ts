import z from 'zod'
import { FeedArticle, FeedSchema } from '@/types/feed'

/** Article Schema */
export const ArticleSchema = FeedArticle.extend({
    _id: z.string(),
    feed_id: FeedSchema.shape._id,
})
export type ArticleSchema = z.infer<typeof ArticleSchema>
