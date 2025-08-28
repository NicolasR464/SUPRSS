import { FeedItem } from '@/types/feed'
import Link from 'next/link'

export const Card = ({ item }: { item: FeedItem }) => {
    console.log(item)

    return (
        <li className="rounded-xl p-4 shadow border">
            {item?.imageUrl && (
                <img
                    className="rounded-xl p-2"
                    src={item.imageUrl}
                    alt="image"
                />
            )}

            <div>
                <Link
                    href={item.link ?? '#'}
                    target="_blank"
                    className="font-medium hover:underline"
                >
                    {item.title}
                </Link>
                <div className="text-sm opacity-70">
                    {item.pubDate
                        ? new Date(item.pubDate).toLocaleString()
                        : ''}
                </div>
                {item.contentSnippet && (
                    <p className="text-sm mt-2">{item.contentSnippet}</p>
                )}
            </div>
        </li>
    )
}
