import axios, { AxiosInstance } from 'axios'

/**
 * Creates an Axios instance with the specified base URL.
 * @param {string} baseURL - The base URL for the Axios instance.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const createInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 40_000,
    })
    return instance
}

/**
 * Creates an Axios instance for back-end API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const backEndInstance = createInstance(
    typeof window === 'undefined'
        ? process.env.URL_BACKEND!
        : process.env.NEXT_PUBLIC_URL_BACKEND!
)

/**
 * Creates an Axios instance for front-end API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const frontEndInstance = createInstance(
    typeof window === 'undefined'
        ? process.env.URL_FRONT!
        : process.env.NEXT_PUBLIC_URL_FRONT!
)
