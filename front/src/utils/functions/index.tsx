import { CollectionTag } from '@/types/tags'

import { DaisyColor } from '@/types/tags'

/**
 * Generates a random avatar URL using the Dicebear API.
 *
 * @see https://api.dicebear.com/ for more information about the API.
 */
export const getRandomAvatarUrl = (): string => {
    const randomSeed = Math.random().toString(36).substring(7)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
}

/**
 * Picks a color from the DaisyColor palette based on the tag.
 *
 * @param tag - The tag to pick a color for.
 * @returns The picked color.
 */
export const pickColor = (tag: CollectionTag): DaisyColor => {
    const palette = DaisyColor.options
    let h = 0
    for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) | 0
    return palette[Math.abs(h) % palette.length]
}

/** Replace :id in path with ID passed. */
export const pathWithId = (path: string, id: number | string) => {
    return path.replace(':id', id.toString())
}
