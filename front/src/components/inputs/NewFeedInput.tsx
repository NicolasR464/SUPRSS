'use client'

import { useState } from 'react'

export const NewFeedInput = () => {
    const [url, setUrl] = useState<string>('')

    const handleClick = () => {
        console.log(url)
    }

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">RSS Feed</legend>

            <input
                type="text"
                className="input"
                placeholder="Paste the RSS URL here."
                value={url}
                onChange={({ target }) => setUrl(target.value)}
            />

            <button
                className="m-2 btn btn-soft btn-info rounded-box"
                onClick={handleClick}
            >
                Add
            </button>
        </fieldset>
    )
}
