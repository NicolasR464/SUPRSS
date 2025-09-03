import { ChatRoom } from '@/types/chat'
import { backEndInstance } from '../axiosInstance'
import { addAuthHeader } from '../header'
import { CollectionSchema } from '@/types/collection'
import { ArticleSchema } from '@/types/article'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { AxiosResponse } from 'axios'
import { pathWithId } from '@/utils/functions'

type CollectionByIdResponse = {
    articles: ArticleSchema[]
    chat: ChatRoom
    collection: CollectionSchema
}

/**
 * Get collection data.
 * @param {string} collectionId The collection ID.
 * @param {string} JWT The JWT token for authentication.
 * @returns {Promise<CollectionByIdResponse>}
 */
export const getCollectionById = async (
    collectionId: number,
    JWT: string
): Promise<CollectionByIdResponse> => {
    // Add the authorization header
    addAuthHeader(backEndInstance, JWT)

    console.log({ JWT })
    console.log({ collectionId })

    console.log(pathWithId(apiEndpoints.private.COLLECTION_BY_ID, collectionId))

    const response = await backEndInstance.get(
        pathWithId(apiEndpoints.private.COLLECTION_BY_ID, collectionId)
    )

    // Return
    return response.data
}
