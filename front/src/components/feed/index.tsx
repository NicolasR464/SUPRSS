import { RssFeed } from '@/types/feed'
import Link from 'next/link'

export const FeedCard = ({ feed }: { feed: RssFeed }) => {
    console.log(feed)

    return (
        <div className="rounded-xl p-4 shadow border max-w-lg m-6">
            <div>
                {/** Title */}
                <Link
                    href={feed.link ?? '#'}
                    target="_blank"
                    className="font-medium hover:underline"
                >
                    {feed.title}
                </Link>

                {/** Date published */}
                <div className="text-sm opacity-70">
                    {feed.pubDate && (
                        <span>
                            <span> last published: </span>
                            {new Date(feed.pubDate).toLocaleString()}
                        </span>
                    )}
                </div>

                {/** Description */}
                {feed.description && (
                    <p className="text-sm mt-2">{feed.description}</p>
                )}

                {/** Copyright */}
                {feed.copyright && (
                    <p className="text-sm mt-2 opacity-70">
                        © {feed.copyright}
                    </p>
                )}
            </div>
        </div>
    )
}
