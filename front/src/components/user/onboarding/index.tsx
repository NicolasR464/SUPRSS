'user client'

import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { useUserStore } from '@/store/user'
import { updateUser } from '@/utils/apiCalls/user'
import { messages } from '@/utils/constants/messages'
import { getRandomAvatarUrl } from '@/utils/functions'
import { useAuth } from '@clerk/nextjs'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const UserOnboarding = () => {
    const { getToken } = useAuth()

    const setUserData = useUserStore((state) => state.setUserData)

    const [avatar, setAvatar] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [isSending, setIsSending] = useState(false)

    const handleSubmit = async () => {
        setIsSending(true)

        const JWT = await getToken()

        const userData = {
            pseudo,
            avatar,
        }

        if (!JWT) return

        const userRes = await updateUser(JWT, userData)

        setIsSending(false)

        setUserData(userRes)

        // Toaster
        toast.success(messages.success.USER)
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
                        {avatar && (
                            <Image
                                src={avatar}
                                alt="avatar"
                                width={80}
                                height={80}
                                className="rounded-full"
                                unoptimized
                            />
                        )}

                        {!avatar && (
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
                        onClick={() => setAvatar(getRandomAvatarUrl())}
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
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                    />
                    <p className="label"></p>
                </fieldset>

                <button
                    className="m-2 btn btn-soft btn-info rounded-box"
                    onClick={() => handleSubmit()}
                    disabled={isSending}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
