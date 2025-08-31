/**
 * Generates a random avatar URL using the Dicebear API.
 *
 * @see https://api.dicebear.com/ for more information about the API.
 */
export const getRandomAvatarUrl = (): string => {
    const randomSeed = Math.random().toString(36).substring(7)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
}
