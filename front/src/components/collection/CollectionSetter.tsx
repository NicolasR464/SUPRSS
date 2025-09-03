'use client'

import { useUserStore } from '@/store/user'
import { CollectionTagsSetter } from '@/components/tags'
import { useEffect, useState } from 'react'
import { Divider } from '@/components/divider'
import { CollectionTag } from '@/types/tags'
import { FeedImportPayload } from '@/types/feed/payload'
import { useFeedStore } from '@/store/feed'
import { importFeed } from '@/utils/apiCalls/feed'
import { useAuth } from '@clerk/nextjs'
import { backErrors, messages } from '@/utils/constants/messages'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { pathWithId } from '@/utils/functions'
import { localRoutes } from '@/utils/constants/endpoints'
import { CollectionSubscription } from '@/types/user'

const DEFAULT_COLLECTION = ''
const DEFAULT_PUBLISH_BUTTON_TEXT = 'Publish'

export const CollectionSetter = () => {
    const { getToken } = useAuth()
    const router = useRouter()

    const user = useUserStore((s) => s.user)
    const setUserData = useUserStore((state) => state.setUserData)

    const selectedFeed = useFeedStore((state) => state.selectedFeed)
    const setSelectedFeed = useFeedStore((state) => state.setSelectedFeed)

    const [publishInCollection, setPublishInCollection] = useState(false)

    const [userCollections, setUserCollections] = useState<string[]>([])

    const [newCollectionName, setNewCollectionName] =
        useState(DEFAULT_COLLECTION)

    const [collectionSelectorValue, setCollectionSelectorValue] =
        useState<string>(DEFAULT_COLLECTION)

    const [publishButtonText, setPublishButtonText] = useState(
        DEFAULT_PUBLISH_BUTTON_TEXT
    )

    const [tagsSelected, setTagsSelected] = useState<CollectionTag[]>([])

    useEffect(() => {
        if (user?.collectionsSubscriptions) {
            const collections = user.collectionsSubscriptions.map(
                (collection) => collection.name
            )

            setUserCollections(collections)
        }
    }, [user])

    // Keep publish button text in sync
    useEffect(() => {
        if (newCollectionName) {
            setPublishButtonText(`Publish in ${newCollectionName}`)
        } else if (collectionSelectorValue) {
            setPublishButtonText(`Publish in ${collectionSelectorValue}`)
        } else {
            setPublishButtonText(DEFAULT_PUBLISH_BUTTON_TEXT)
        }
    }, [newCollectionName, collectionSelectorValue])

    /** Handle submit on publish button click */
    const handleSubmit = async () => {
        console.log('🔥 handleSubmit')

        console.log({ newCollectionName })
        console.log({ collectionSelectorValue })

        // If collection option is checked but no collection name is set
        if (
            publishInCollection &&
            !newCollectionName &&
            !collectionSelectorValue
        ) {
            toast.error(messages.error.MUST_SELECT_COLLECTION)

            return
        }

        const JWT = await getToken()

        if (!JWT || !selectedFeed) {
            return
        }

        const collectionFound =
            user &&
            user?.collectionsSubscriptions?.find(
                (collection) => collection.name === collectionSelectorValue
            )

        const collection = {
            ...(collectionFound && { _id: collectionFound.collection_id }),
            name: collectionSelectorValue || newCollectionName,
            ...(tagsSelected.length > 0 && { tags: tagsSelected }),
        }

        console.log({ collection })

        const payload: FeedImportPayload = {
            ...(collection.name && { collection }),
            feed: selectedFeed,
        }

        console.log({ payload })

        // CALL
        const importFeedRes = await importFeed(payload, JWT)

        console.log({ importFeedRes })

        // Error handling
        if (importFeedRes && 'error' in importFeedRes) {
            if (
                importFeedRes.error === backErrors.COLLECTION_NAME_ALREADY_TAKEN
            ) {
                toast.error(backErrors.COLLECTION_NAME_ALREADY_TAKEN)

                return
            }

            toast.error(messages.error.DEFAULT)
            return
        }

        // Empty fields
        setCollectionSelectorValue(DEFAULT_COLLECTION)

        setNewCollectionName(DEFAULT_COLLECTION)

        setPublishButtonText(DEFAULT_PUBLISH_BUTTON_TEXT)

        // Update user and feed store
        setUserData(importFeedRes)

        setSelectedFeed()

        // Redirection

        let newCollectionFound: CollectionSubscription

        if (publishInCollection) {
            newCollectionFound = importFeedRes.collectionsSubscriptions.find(
                (collection: CollectionSubscription) =>
                    collection.name === collectionSelectorValue ||
                    collection.name === newCollectionName
            )

            if (newCollectionFound)
                router.push(
                    pathWithId(
                        localRoutes.collection,
                        newCollectionFound.collection_id
                    )
                )

            return
        }

        if (user.feedSubscriptions?.length) {
            const lastId = user.feedSubscriptions.at(-1)!

            router.push(pathWithId(localRoutes.feed, lastId.toString()))
        }
    }

    return (
        <div className="flex items-center justify-center flex-col">
            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
                <legend className="fieldset-legend">Publishing options</legend>

                <label className="label cursor-pointer justify-between">
                    <span className="label-text">
                        {publishInCollection
                            ? 'Publish in a collection'
                            : 'Publish in no collection'}
                    </span>

                    <input
                        type="checkbox"
                        checked={publishInCollection}
                        onChange={({ target }) => {
                            setPublishInCollection(target.checked)

                            setNewCollectionName(DEFAULT_COLLECTION)

                            setCollectionSelectorValue(DEFAULT_COLLECTION)
                        }}
                        className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                    />
                </label>
            </fieldset>

            {publishInCollection && (
                <>
                    {/* Existing collections selector */}
                    {userCollections.length > 0 && (
                        <div>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">
                                    Add the feed to an existing collection:
                                </legend>
                                <select
                                    className="select"
                                    value={collectionSelectorValue}
                                    onChange={({ target }) => {
                                        setCollectionSelectorValue(target.value)

                                        setNewCollectionName(DEFAULT_COLLECTION)
                                    }}
                                >
                                    <option value="" disabled>
                                        Pick a collection
                                    </option>
                                    {userCollections.map((col) => (
                                        <option key={col} value={col}>
                                            {col}
                                        </option>
                                    ))}
                                </select>
                            </fieldset>

                            <Divider />
                        </div>
                    )}

                    {/* New collection input */}
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Add the feed to a new collection
                            </legend>
                            <input
                                className="input"
                                type="text"
                                value={newCollectionName}
                                placeholder="New collection name"
                                maxLength={25}
                                onChange={(e) => {
                                    setNewCollectionName(e.target.value.trim())

                                    setCollectionSelectorValue(
                                        DEFAULT_COLLECTION
                                    )
                                }}
                            />
                        </fieldset>
                    </div>

                    {/* Collection tags */}
                    {newCollectionName && (
                        <CollectionTagsSetter
                            tagsSelected={tagsSelected}
                            setTagsSelected={setTagsSelected}
                        />
                    )}
                </>
            )}

            {/** Publish action */}
            <Divider text="↓ Hit publish ↓" />

            <button
                onClick={() => handleSubmit()}
                className="btn rounded-box btn-soft btn-success btn-lg m-4"
            >
                {publishButtonText}
            </button>
        </div>
    )
}
