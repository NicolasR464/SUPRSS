import { Card } from '@/components/feed/Card'
import { fetchRss } from '@/utils/rss'

const FEED_URL = 'https://www.lemonde.fr/rss/une.xml'

export const revalidate = 900 // match the util

export const Feeds = async ({}) => {
    const feedsData = await fetchRss(FEED_URL)

    console.log({ feedsData })

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Latest Headlines</h1>
            <ul className="space-y-3">
                {feedsData &&
                    feedsData.items?.map((feed, index) => (
                        <Card feed={feed} key={index} />
                    ))}
            </ul>
        </div>
    )
}

export default Feeds
