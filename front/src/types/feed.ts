import z from 'zod'

export const MediaDescription = z.object({
    _: z.string().optional(),
    $: z
        .object({
            type: z.string().optional(),
        })
        .optional(),
})
export type MediaDescription = z.infer<typeof MediaDescription>

export const MediaCredit = z.object({
    _: z.string().optional(),
    $: z
        .object({
            scheme: z.string().optional(),
        })
        .optional(),
})
export type MediaCredit = z.infer<typeof MediaCredit>

export const MediaItem = z.object({
    $: z
        .object({
            width: z.string().optional(),
            height: z.string().optional(),
            url: z.string().optional(),
        })
        .optional(),
    'media:description': z.array(MediaDescription).optional(),
    'media:credit': z.array(MediaCredit).optional(),
})
export type MediaItem = z.infer<typeof MediaItem>

export const FeedItem = z.object({
    title: z.string().optional(),
    link: z.string().optional(),
    pubDate: z.string().optional(),
    imageUrl: z.string().optional(),
    content: z.string().optional(),
    contentSnippet: z.string().optional(),
    guid: z.string().optional(),
    isoDate: z.string().optional(),
})
export type FeedItem = z.infer<typeof FeedItem>

export const PaginationLinks = z.object({
    self: z.string().optional(),
})
export type PaginationLinks = z.infer<typeof PaginationLinks>

/** RSS Feeds data parsed by the RSS parser */
export const RssFeed = z.object({
    items: z.array(FeedItem).optional(),
    feedUrl: z.string().optional(),
    paginationLinks: PaginationLinks.optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.string().optional(),
    link: z.string().optional(),
    language: z.string().optional(),
    copyright: z.string().optional(),
})
export type RssFeed = z.infer<typeof RssFeed>

/** Feed schema stored in the database */
const FeedSchema = FeedItem.extend({
    rooms: z.string().array(),
    /** User who imported the feed */
    user: z.string(),
})

export type FeedSchema = z.infer<typeof FeedSchema>
