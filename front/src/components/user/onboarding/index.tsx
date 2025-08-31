'user client'

import { avatarPlaceholder } from '@/constants/avatarPlaceholder'
import { getRandomAvatarUrl } from '@/utils/functions'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const UserOnboarding = () => {
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        console.log(avatarUrl)
    }, [avatarUrl])

    const handleSubmit = async () => {
        console.log('handleSubmit')
    }

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex flex-col border border-solid border-gray-700 rounded-box p-8">
                <h1 className="text-2xl font-semibold">
                    👋 Set your pseudo and avatar
                </h1>

                {/** Avatar Image */}
                <div className="avatar flex p-8 items-center">
                    <div className="w-24 rounded-full">
                        {avatarUrl && (
                            <Image
                                src={avatarUrl}
                                alt="avatar"
                                width={80}
                                height={80}
                                className="rounded-full"
                                unoptimized
                            />
                        )}

                        {!avatarUrl && (
                            <Image
                                src={avatarPlaceholder}
                                alt="Avatar"
                                width={100}
                                height={100}
                                priority
                            />
                        )}
                    </div>

                    <button
                        className="m-2 btn btn-soft btn-info rounded-box"
                        onClick={() => setAvatarUrl(getRandomAvatarUrl())}
                    >
                        Set your avatar
                    </button>
                </div>

                {/** Pseudo  */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Pseudo</legend>

                    <input
                        type="text"
                        className="input min-w-[200px]"
                        placeholder="Enter your pseudo name"
                    />
                    <p className="label"></p>
                </fieldset>

                <button
                    className="m-2 btn btn-soft btn-info rounded-box"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
