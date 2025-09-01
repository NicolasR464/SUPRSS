'use client'

import { useMemo, useState } from 'react'
import { Chip } from '@/components/tags/chip'
import { Divider } from '../divider'
import { CollectionTag } from '@/types/tags'
import { CollectionTagLabels } from '@/utils/constants/tags'
import { pickColor } from '@/utils/functions'

type CollectionTagsSetterProps = {
    tagsSelected: CollectionTag[]
    setTagsSelected: React.Dispatch<React.SetStateAction<CollectionTag[]>>
}

export const CollectionTagsSetter = ({
    tagsSelected,
    setTagsSelected,
}: CollectionTagsSetterProps) => {
    const available = useMemo(
        () => CollectionTag.options.filter((t) => !tagsSelected.includes(t)),
        [tagsSelected]
    )

    const add = (tag: CollectionTag) =>
        setTagsSelected((s) => (s.includes(tag) ? s : [...s, tag]))

    const remove = (tag: CollectionTag) =>
        setTagsSelected((s) => s.filter((t) => t !== tag))

    return (
        <div className="max-w-2xl m-2">
            <h2 className="text-center">🎨 Tag your new collection</h2>

            {tagsSelected.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3 justify-center">
                    {tagsSelected.map((tag) => (
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
                    <Divider text="↑ Tag(s) Selected ↑" color="success" />
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
