'use client'

import { FaPlusCircle } from 'react-icons/fa'
import { useUserStore } from '@/store/user'

import { CollectionTagsSetter } from '../tags'
import { useEffect } from 'react'

export const CollectionSetter = () => {
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        if (user) {
            console.log({ user })
            // setCollections(user.collections)
        }
    }, [user])

    return (
        <div className="flex items-center justify-center flex-col">
            <button className="m-2 btn btn-soft btn-info rounded-box">
                <FaPlusCircle />
                <span className="pl-2">Add feed to a collection</span>
            </button>

            <CollectionTagsSetter />
        </div>
    )
}
