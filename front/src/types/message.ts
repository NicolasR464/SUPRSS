import z from 'zod'

export const InstantMessage = z.object({
    roomId: z.string(),
    text: z.string(),
    timeStamp: z.number(),
})

export type InstantMessage = z.infer<typeof InstantMessage>
