'use client'

import { InstantChatSchema } from '@/types/chat'
import { timeAgo } from '@/utils/time'
import { useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

export default function Chat({ room_id }: { room_id: string }) {
    const [messages, setMessages] = useState<InstantChatSchema[]>([])
    const [message, setMessage] = useState('')
    const socketRef = useRef<Socket | null>(null)

    console.log('In Chat')

    console.log('room_id ', room_id)

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_URL_SOCKET}`, {
            path: '/chat',
        })

        socketRef.current = socket

        socket.on('message', (message: InstantChatSchema) => {
            console.log('message ', message)

            if (message.room_id === room_id) {
                setMessages((prev) => [...prev, message])
            }
        })

        socketRef.current.on('disconnect', () => {
            console.log('❌ disconnected from socket server')
        })

        return () => {
            socketRef.current?.disconnect()
        }
    }, [room_id])

    const sendMessage = () => {
        socketRef.current?.emit('message', {
            room_id,
            text: message.trim(),
            created_at: Date.now(),
        })

        setMessage('')
    }

    return (
        <div className="mx-auto max-w-xl p-6">
            {/* Card */}
            <div className="rounded-2xl border border-zinc-200/70 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                {/* Header */}
                <div className="sticky top-0 flex items-center justify-between rounded-t-2xl border-b border-zinc-200/70 bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-500 px-5 py-4 text-white dark:border-zinc-800">
                    <h1 className="text-lg font-semibold tracking-tight">
                        Real-Time Chat
                    </h1>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs">
                        live
                    </span>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto px-5 py-4 space-y-3">
                    {messages.length === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            No messages yet. Be the first to say hi 👋
                        </p>
                    ) : (
                        messages.map(
                            (message: InstantChatPayload, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    {/* Avatar */}
                                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-zinc-100 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                        U
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="rounded-2xl bg-zinc-100 px-3.5 py-2 text-sm leading-relaxed text-zinc-800 shadow-sm dark:bg-zinc-800 dark:text-zinc-100">
                                            {message.text}
                                        </div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {timeAgo(
                                                Number(message.created_at)
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>

                {/* Composer */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        sendMessage()
                    }}
                    className="flex items-center gap-2 border-t border-zinc-200/70 px-5 py-4 dark:border-zinc-800"
                >
                    <input
                        type="text"
                        placeholder="Type a message…"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 outline-none ring-0 transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-indigo-500/60 dark:focus:ring-indigo-500/10"
                    />
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-zinc-300 dark:disabled:bg-zinc-700 cursor-pointer"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}
