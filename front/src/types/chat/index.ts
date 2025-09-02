import z from 'zod'
import { UserSchema } from '../user'
import { ArticleSchema } from '../article'

/** Instant Chat Schema */
export const InstantChatSchema = z.object({
    _id: z.string(),
    user_id: UserSchema.shape.clerk_user_id,
    userPseudo: UserSchema.shape.pseudo,
    text: z.string().max(5000),
    created_at: z.date(),
})
export type InstantChatSchema = z.infer<typeof InstantChatSchema>

export const ChatRoom = z.object({
    article_id: ArticleSchema.shape._id,
    collection_id: z.string(),
    chats: InstantChatSchema.array(),
})
export type ChatRoom = z.infer<typeof ChatRoom>
