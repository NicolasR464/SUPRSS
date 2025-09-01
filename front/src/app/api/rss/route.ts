import { messages } from '@/utils/constants/messages'
import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media', { keepArray: true }],
            ['media:thumbnail', 'thumbs', { keepArray: true }],
            ['content:encoded', 'contentEncoded'],
        ],
    },
})

// remove common zero-width / bidi control chars that break URLs
const stripInvisibles = (s: string) =>
    s
        .trim()
        // zero-width chars + BOM
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        // bidi controls (LRM/RLM/LRE/RLE/PDF/LRO/RLO) and isolates
        .replace(/[\u202A-\u202E\u2066-\u2069]/g, '')

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const body = await req.json().catch(() => ({}))
        let { rssURL } = body as { rssURL?: string }

        if (!rssURL || typeof rssURL !== 'string') {
            return NextResponse.json(
                { error: 'Missing rssURL parameter' },
                { status: 400 }
            )
        }

        rssURL = stripInvisibles(rssURL)

        let cleanURL: string
        try {
            cleanURL = new URL(rssURL).toString()
        } catch {
            return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
        }

        const feed = await parser.parseURL(cleanURL)

        const items = feed.items?.map((item) => {
            const { media, ...rest } = item ?? {}
            return {
                ...rest,
                imageUrl: media?.[0]?.$?.url,
            }
        })

        return NextResponse.json({ ...feed, items })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: messages.error.RSS }, { status: 500 })
    }
}
