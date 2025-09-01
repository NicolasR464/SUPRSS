import { FeedArticle } from '@/types/feed'
import Link from 'next/link'

export const ArticleCard = ({ article }: { article: FeedArticle }) => {
    console.log(article)

    return (
        <li className="rounded-xl p-4 shadow border">
            {article?.imageUrl && (
                <img
                    className="rounded-xl p-2"
                    src={article.imageUrl}
                    alt="image"
                />
            )}

            <div>
                <Link
                    href={article.link ?? '#'}
                    target="_blank"
                    className="font-medium hover:underline"
                >
                    {article.title}
                </Link>
                <div className="text-sm opacity-70">
                    {article.pubDate
                        ? new Date(article.pubDate).toLocaleString()
                        : ''}
                </div>
                {article.contentSnippet && (
                    <p className="text-sm mt-2">{article.contentSnippet}</p>
                )}
            </div>
        </li>
    )
}
