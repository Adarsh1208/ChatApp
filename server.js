const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = socketio(server)

let users = {
    'adarsh': '12345'
}

io.on('connection', (socket) => {
    console.log('Connected with Socket id : ', socket.id)

    socket.on('userLogin', data => {
        if (users[data.username]) {
            if (users[data.username] == data.password) {
                socket.join(data.username)
                socket.emit('loggedIn')
            } else {
                socket.emit('logInFail', data)
            }
        } else {
            users[data.username] = data.password
            socket.join(data.username)
            socket.emit('loggedIn')
        }
        console.log(users)
    })

    socket.on('msgSend', data => {
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