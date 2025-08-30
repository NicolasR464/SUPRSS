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

    socket.on('message', (msg) => {
        console.log('📩', msg)
        io.emit('message', msg) // broadcast to all clients
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
