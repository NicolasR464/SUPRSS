'use client'

import Chat from '@/components/chat'
import { useParams } from 'next/navigation'

export const Feed = () => {
    const { id: room_id } = useParams<{ id: string }>()

    return (
        <div>
            <h1>Feed {room_id}</h1>

            <Chat room_id={room_id} />
        </div>
    )
}

export default Feed
