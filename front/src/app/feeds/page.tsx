import { ArticleCard } from '@/components/article'
import { fetchRss } from '@/utils/apiCalls/rss'

const FEED_URL = 'https://www.lemonde.fr/rss/une.xml'

export const Feeds = async ({}) => {
    const feedsData = await fetchRss(FEED_URL)

    console.log({ feedsData })

    return (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Latest Headlines</h1>
            <ul className="space-y-3">
                {feedsData &&
                    feedsData.items?.map((article, index) => (
                        <ArticleCard article={article} key={index} />
                    ))}
            </ul>
        </div>
    )
}

export default Feeds
