import { FeedItem } from '@/types/feed'
import Link from 'next/link'

export const Card = ({ feed }: { feed: FeedItem }) => {
    console.log(feed)

    return (
        <li className="rounded-xl p-4 shadow border">
            {feed?.imageUrl && (
                <img
                    className="rounded-xl p-2"
                    src={feed.imageUrl}
                    alt="image"
                />
            )}

            <div>
                <Link
                    href={feed.link ?? '#'}
                    target="_blank"
                    className="font-medium hover:underline"
                >
                    {feed.title}
                </Link>
                <div className="text-sm opacity-70">
                    {feed.pubDate
                        ? new Date(feed.pubDate).toLocaleString()
                        : ''}
                </div>
                {feed.contentSnippet && (
                    <p className="text-sm mt-2">{feed.contentSnippet}</p>
                )}
            </div>
        </li>
    )
}
