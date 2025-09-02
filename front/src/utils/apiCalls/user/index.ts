import { apiEndpoints } from '@/utils/constants/endpoints'
import { AxiosResponse } from 'axios'
import { backEndInstance } from '../axiosInstance'
import { addAuthHeader } from '../header'
import { UserSchema } from '@/types/user'

/**
 * Get user data.
 * @param {string} JWT The JWT token for authentication.
 * @returns {Promise<UserSchema | undefined>} A promise that resolves with user information or undefined if not found.
 */
export const getUserData = async (
    JWT: string
): Promise<UserSchema | undefined> => {
    // Add the authorization header
    addAuthHeader(backEndInstance, JWT)

    // API call to get user
    const response: AxiosResponse<UserSchema> = await backEndInstance.get(
        apiEndpoints.private.USER
    )

    if (response.status !== 200) {
        return undefined
    }

    // Return user
    return response.data
}

export const updateUser = async (
    JWT: string,
    userData: Partial<UserSchema>
) => {
    // Add the authorization header
    addAuthHeader(backEndInstance, JWT)

    // API call to update user
    const response: AxiosResponse<{ user: UserSchema }> =
        await backEndInstance.put(apiEndpoints.private.USER, userData)

    if (response.status !== 200) {
        return undefined
    }

    // Return user
    return response.data.user
}
