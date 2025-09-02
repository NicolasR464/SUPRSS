// components/tags/chip.tsx
'use client'
import { DaisyColor } from '@/types/tags'

const badgeClassFor = (c: DaisyColor) =>
    ({
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        accent: 'badge-accent',
        info: 'badge-info',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
    }[c] ?? 'badge-neutral')

type ChipProps = { label: string; color: DaisyColor }

export const Chip = ({ label, color }: ChipProps) => {
    return (
        <div
            className={`badge badge-soft ${badgeClassFor(
                color
            )} m-2 cursor-pointer`}
        >
            {label}
        </div>
    )
}
