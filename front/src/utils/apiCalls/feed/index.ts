import { AxiosResponse } from 'axios'
import { backEndInstance } from '@/utils/apiCalls/axiosInstance'
import { addAuthHeader } from '@/utils/apiCalls/header'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { FeedImportPayload } from '@/types/feed/payload'

/** Import a feed and optionally create a new collection */
export const importFeed = async (payload: FeedImportPayload, JWT: string) => {
    const payloadParsed = FeedImportPayload.safeParse(payload)

    if (!payloadParsed.success) {
        return undefined
    }

    // Add the authorization header
    addAuthHeader(backEndInstance, JWT)

    // API call to import a feed
    const response: AxiosResponse = await backEndInstance.post(
        apiEndpoints.private.FEED_IMPORT,
        payloadParsed.data
    )

    console.log({ response })

    // Return
    return response.status
}
