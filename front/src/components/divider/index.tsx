'use client'

import { DaisyColor } from '@/types/tags'

type DividerProperties = {
    color: DaisyColor
    text: string
}

export const Divider = ({ color, text }: DividerProperties) => {
    return (
        <div className="flex w-full flex-col">
            <div className={`divider divider-${color}`}>{text}</div>
        </div>
    )
}
