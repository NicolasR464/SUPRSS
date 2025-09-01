import { NewFeedImporter } from '@/components/feed/NewFeedImporter'

import { FaRss } from 'react-icons/fa'

const NewFeed = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="flex items-center">
                <FaRss /> <span className="ml-2">New Feed</span>
            </h1>

            <NewFeedImporter />
        </div>
    )
}

export default NewFeed
