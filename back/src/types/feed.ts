import z from 'zod'
import { ChatRoomSchema } from './chat'
import { CollectionSchema } from './collection'
import { FeedType } from './tags'

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

export const FeedArticle = z.object({
    title: z.string().optional(),
    link: z.string().optional(),
    pubDate: z.string().optional(),
    imageUrl: z.string().optional(),
    content: z.string().optional(),
    contentSnippet: z.string().optional(),
    guid: z.string().optional(),
    isoDate: z.string().optional(),
})
export type FeedArticle = z.infer<typeof FeedArticle>

export const PaginationLinks = z.object({
    self: z.string().optional(),
})
export type PaginationLinks = z.infer<typeof PaginationLinks>

/** RSS Feeds data parsed by the RSS parser */
export const RssFeed = z.object({
    items: z.array(FeedArticle).optional(),
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

/** Article Schema */
export const ArticleSchema = FeedArticle.extend({
    id: z.string(),
    chatRoom_id: ChatRoomSchema.shape.id,
    /** User who imported the feed */
    user_id: z.string(),
})
export type ArticleSchema = z.infer<typeof ArticleSchema>

export const FeedStatus = z.enum(['ACTIVE', 'INACTIVE'])
export type FeedStatus = z.infer<typeof FeedStatus>

/** Feed Schema */
export const FeedSchema = RssFeed.omit({
    items: true,
    paginationLinks: true,
}).extend({
    articles_ids: ArticleSchema.shape.id.array(),
    collections_ids: CollectionSchema.shape.id.array(),
    status: FeedStatus,
    type: FeedType,
})
export type FeedSchema = z.infer<typeof FeedSchema>
