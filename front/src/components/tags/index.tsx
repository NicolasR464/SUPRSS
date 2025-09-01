'use client'

import { useMemo, useState } from 'react'
import { Chip } from '@/components/tags/chip'
import { Divider } from '../divider'
import { CollectionTag, DaisyColor } from '@/types/tags'
import { CollectionTagLabels } from '@/utils/constants/tags'

// Simple stable hash → color index
const pickColor = (tag: CollectionTag): DaisyColor => {
    const palette = DaisyColor.options
    let h = 0
    for (let i = 0; i < tag.length; i++) h = (h * 31 + tag.charCodeAt(i)) | 0
    return palette[Math.abs(h) % palette.length]
}

export const CollectionTagsSetter = () => {
    const [selected, setSelected] = useState<CollectionTag[]>([])

    const available = useMemo(
        () => CollectionTag.options.filter((t) => !selected.includes(t)),
        [selected]
    )

    const add = (tag: CollectionTag) =>
        setSelected((s) => (s.includes(tag) ? s : [...s, tag]))

    const remove = (tag: CollectionTag) =>
        setSelected((s) => s.filter((t) => t !== tag))

    return (
        <div className="max-w-2xl m-2">
            <h2 className="text-center">Tag your collection</h2>

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                    {selected.map((tag) => (
                        <button
                            key={`sel-${tag}`}
                            type="button"
                            onClick={() => remove(tag)}
                            title="Remove tag"
                        >
                            <Chip
                                label={CollectionTagLabels[tag]}
                                color={pickColor(tag)}
                            />
                        </button>
                    ))}
                    <Divider text="↑ Selected ↑" color="success" />
                </div>
            )}

            <div className="flex flex-wrap gap-2 justify-center">
                {available.map((tag) => (
                    <button
                        key={`avail-${tag}`}
                        type="button"
                        onClick={() => add(tag)}
                        title="Add tag"
                    >
                        <Chip
                            label={CollectionTagLabels[tag]}
                            color={pickColor(tag)}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
