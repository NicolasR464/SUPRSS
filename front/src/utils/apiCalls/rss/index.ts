import { RssFeed } from '@/types/feed'
import { frontEndInstance } from '../axiosInstance'

export const fetchRss = async (rssURL: string): Promise<RssFeed> => {
    const res = await frontEndInstance.post('/api/rss', {
        rssURL,
    })

    return res.data
}
