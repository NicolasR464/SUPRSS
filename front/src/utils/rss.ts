// import { RssFeed } from '@/types/feed'
// import Parser from 'rss-parser'

// const parser = new Parser({
//     customFields: {
//         item: [
//             ['media:content', 'media', { keepArray: true }],
//             ['media:thumbnail', 'thumbs', { keepArray: true }],
//             ['content:encoded', 'contentEncoded'],
//         ],
//     },
// })

// export async function fetchRss(url: string): Promise<RssFeed> {
//     const feed = await parser.parseURL(url)

//     console.log({ feed })

//     const items = feed.items?.map((i) => {
//         const { media, ...itemWithoutMedia } = i
//         return {
//             ...itemWithoutMedia,
//             imageUrl: media?.[0]?.$?.url,
//         }
//     })

//     return { ...feed, items }
// }
