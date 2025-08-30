'use client'

import { useEffect, useRef, useState } from 'react'
import { io, type Socket } from 'socket.io-client'

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([])
    const [message, setMessage] = useState('')
    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        const socket = io(`${process.env.NEXT_PUBLIC_URL_SOCKET}`, {
            path: '/chat',
        })

        // Connect to your Socket.IO serve
        socketRef.current = socket

        socketRef.current.on('connect', () => {
            console.log('✅ connected to socket server')
        })

        socketRef.current.on('message', (msg: string) => {
            setMessages((prev) => [...prev, msg])
        })

        socketRef.current.on('disconnect', () => {
            console.log('❌ disconnected from socket server')
        })

        return () => {
            socketRef.current?.disconnect()
        }
    }, [])

    const sendMessage = () => {
        const trimmed = message.trim()
        if (trimmed) {
            socketRef.current?.emit('message', trimmed)
            setMessage('')
        }
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Real-Time Chat</h1>
            <div
                style={{
                    height: '300px',
                    overflowY: 'scroll',
                    border: '1px solid #ddd',
                    padding: '1rem',
                    marginBottom: '1rem',
                }}
            >
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>User:</strong> {msg}
                    </div>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: '100%', padding: '0.5rem' }}
            />
            <button
                onClick={sendMessage}
                style={{ marginTop: '0.5rem', width: '100%' }}
            >
                Send
            </button>
        </div>
    )
}
