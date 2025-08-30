import http from 'http'
import { Server } from 'socket.io'

const server = http.createServer()

const io = new Server(server, {
    path: '/chat',
    cors: {
        origin: process.env.NEXT_PUBLIC_URL_FRONT,
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    console.log('✅ user connected')

    // Send message to a room
    socket.on('message', ({ room, text, timeStamp }) => {
        if (!room || !text) return

        console.log(`📩 [${room}] ${text}`)

        io.to(room).emit('message', { room, text, timeStamp })
    })

    socket.on('disconnect', () => {
        console.log('❌ user disconnected')
    })
})

server.listen(3001, () =>
    console.log(
        '🚀 Socket.IO running at ',
        process.env.NEXT_PUBLIC_URL_SOCKET,
        '/chat'
    )
)
