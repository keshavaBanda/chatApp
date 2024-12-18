const express = require("express");
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://chat-app-ctst.vercel.app/",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with ID: ${socket.id} joined room:${data}`)
    })
    socket.on('send_message', (messageData) => {
        socket.to(messageData.room).emit('receive_message', messageData)
    })
    socket.on("disconnected", () => {
        console.log("User Disconnected..", socket.id)
    })
})

server.listen(3001, () => {
    console.log("Server Running...")
})

// module.exports = server;
