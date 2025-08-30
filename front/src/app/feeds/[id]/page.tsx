'use client'

import Chat from '@/components/chat'
import { useParams } from 'next/navigation'

export const Feed = () => {
    const { id: roomId } = useParams<{ id: string }>()

    console.log('In Feed')

    console.log('roomId ', roomId)

    return (
        <div>
            <h1>Feed {roomId}</h1>

            <Chat roomId={roomId} />
        </div>
    )
}

export default Feed
