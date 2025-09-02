'use client'

import { useFeedStore } from '@/store/feed'
import { fetchRss } from '@/utils/apiCalls/rss'

import { messages } from '@/utils/constants/messages'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export const NewFeedInput = () => {
    const [rssUrl, setRssUrl] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)

    const setSelectedFeed = useFeedStore((state) => state.setSelectedFeed)
    const selectedFeed = useFeedStore((state) => state.selectedFeed)

    useEffect(() => {
        console.log('selectedFeed', selectedFeed)

        if (selectedFeed?.feedUrl === rssUrl) {
            setIsLoading(true)
        }
    }, [selectedFeed, rssUrl])

    const handleClick = async () => {
        setIsLoading(true)
        setDisabled(true)

        const feedData = await fetchRss(rssUrl)
        console.log('rssUrl', rssUrl)

        if (!feedData) {
            toast.error(messages.error.RSS)
            setIsLoading(false)

            return
        }

        setIsLoading(false)

        setSelectedFeed(feedData)
    }

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">RSS Feed</legend>

            <input
                className="input"
                required
                placeholder="Paste the RSS URL here."
                value={rssUrl}
                onChange={({ target }) => {
                    setDisabled(false)
                    setRssUrl(target.value.trim())
                }}
            />

            <button
                disabled={disabled}
                className="m-2 btn btn-soft btn-info rounded-box"
                onClick={handleClick}
            >
                {isLoading ? 'Loading' : 'Add'}
            </button>
        </fieldset>
    )
}
