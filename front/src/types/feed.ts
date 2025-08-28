export interface MediaDescription {
    _?: string
    $?: {
        type?: string
    }
}

export interface MediaCredit {
    _?: string
    $?: {
        scheme?: string
    }
}

export interface MediaItem {
    $?: {
        width?: string
        height?: string
        url?: string
    }
    'media:description'?: MediaDescription[]
    'media:credit'?: MediaCredit[]
}

export interface FeedItem {
    title?: string
    link?: string
    pubDate?: string
    imageUrl?: string
    content?: string
    contentSnippet?: string
    guid?: string
    isoDate?: string
}

export interface PaginationLinks {
    self?: string
}

export interface RssFeed {
    items?: FeedItem[]
    feedUrl?: string
    paginationLinks?: PaginationLinks
    title?: string
    description?: string
    pubDate?: string
    link?: string
    language?: string
    copyright?: string
}
