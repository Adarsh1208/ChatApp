const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { Socket } = require('dgram')

const app = express()
const server = http.createServer(app)

const io = socketio(server)

let users = {
    'adarsh': '12345'
}

let socketMap = {

}

io.on('connection', (socket) => {
    console.log('Connected with Socket id : ', socket.id)

    function login(s, u) {
        socket.join(u)
        socket.emit('loggedIn')
        socketMap[socket.id] = u
        console.log(socketMap)
    }
    socket.on('userLogin', data => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                login(socket, data.username)
            } else {
                socket.emit('logInFail', data)
            }
        } else {
            users[data.username] = data.password
            login(socket, data.username)
        }
        // console.log(users)
    })

    socket.on('msgSend', data => {
        data.from = socketMap[socket.id];
        if (data.to) {
            io.to(data.to).emit('msgRcvd', data)
        } else {
            socket.broadcast.emit('msgRcvd', data)
        }
    })
})

app.use('/', express.static(__dirname + '/public'))

server.listen(3344, () => {
    console.log("Started at http://localhost:3344")
})