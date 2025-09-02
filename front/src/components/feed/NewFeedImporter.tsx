'use client'

import { useFeedStore } from '@/store/feed'
import { NewFeedInput } from '../inputs/NewFeedInput'

import { FeedCard } from '.'
import { CollectionSetter } from '../collection/CollectionSetter'

export const NewFeedImporter = () => {
    const selectedFeed = useFeedStore((state) => state.selectedFeed)

    return (
        <div className="flex flex-col items-center">
            <NewFeedInput />

            {selectedFeed && (
                <div className="flex flex-col items-center">
                    <FeedCard feed={selectedFeed} />

                    <CollectionSetter />
                </div>
            )}
        </div>
    )
}
