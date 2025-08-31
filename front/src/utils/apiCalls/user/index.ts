import { apiEndpoints } from '@/constants/endpoints'
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
    const response: AxiosResponse<{ user: UserSchema }> =
        await backEndInstance.get(apiEndpoints.private.USER)

    if (response.status !== 200) {
        throw new Error('Failed to fetch users')
    }

    // Return user
    return response.data.user
}
