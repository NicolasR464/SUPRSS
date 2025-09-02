import { AxiosInstance } from 'axios'

/**
 * Adds an Authorization header with a JWT token to the specified axios instance.
 *
 * This function sets the Authorization header of the provided axios instance
 * to include the given JWT token. This is typically used to authenticate
 * API requests.
 * @param {AxiosInstance} axiosInstance - The axios instance to which the Authorization header will be added.
 * @param {string} JWT - The JSON Web Token to be included in the Authorization header.
 * @returns {void}
 * @example
 * const jwtToken = 'your.jwt.token';
 * addAuthHeader(axiosInstance, jwtToken);
 * // Now all subsequent requests using the provided axiosInstance will include the Authorization header
 */
export const addAuthHeader = (
    axiosInstance: AxiosInstance,
    JWT: string
): void => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${JWT}`
}
