import { CollectionTagLabels } from '@/constants/tags'
import { Chip } from '@/components/chip'
import { CollectionTag } from '@/types/tags'
import { NewFeedInput } from '@/components/inputs/NewFeedInput'
import { FaRss } from 'react-icons/fa'

const NewFeed = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="flex items-center">
                <FaRss /> <span className="ml-2">New Feed</span>
            </h1>

            <NewFeedInput />

            <div>
                {CollectionTag.options.map((tag) => (
                    <Chip key={tag} label={CollectionTagLabels[tag]} />
                ))}
            </div>
        </div>
    )
}

export default NewFeed
