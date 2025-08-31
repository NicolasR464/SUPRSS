import { ChipColor } from '@/types/tags'

type ChipProperties = {
    label: string
    color?: ChipColor
}

export const Chip = ({ label, color }: ChipProperties) => {
    // Pick a random one if `color` is not provided
    const colors = ChipColor.options
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    console.log(randomColor)

    return (
        <div className={`badge badge-soft badge-${color ?? randomColor}`}>
            {label}
        </div>
    )
}
