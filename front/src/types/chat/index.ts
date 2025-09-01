import z from 'zod'

export const InstantChat = z.object({
    id: z.string(),
    user_id: z.string(),
    text: z.string().max(5000),
    created_at: z.date(),
})
export type InstantChat = z.infer<typeof InstantChat>

/** ChatRoom Schema */
export const ChatRoomSchema = z.object({
    id: z.string(),
    article_id: z.string(),
    collection_id: z.string(),
    chats: InstantChat.array(),
})
export type ChatRoomSchema = z.infer<typeof ChatRoomSchema>

/** Instant Chat payload to send to the back-end */
export const InstantChatPayload = InstantChat.extend({
    room_id: ChatRoomSchema.shape.id,
})
export type InstantChatPayload = z.infer<typeof InstantChatPayload>
