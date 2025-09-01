import { RssFeed } from '@/types/feed'
import { create } from 'zustand'

type FeedStore = {
    selectedFeed: RssFeed | undefined
    setSelectedFeed: (feed: RssFeed) => void
}

export const useFeedStore = create<FeedStore>((set) => ({
    selectedFeed: undefined,

    setSelectedFeed: (feed: RssFeed) => set({ selectedFeed: feed }),
}))
