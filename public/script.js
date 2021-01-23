let socket = io()

let inpMsg = document.getElementById('inpMsg')
let sentBtn = document.getElementById('msgSend')
let msgList = document.getElementById('msgList')

sentBtn.onclick = function () {
    socket.emit('msg_send', {
        msg: inpMsg.value
    })
    inpMsg.value
}

socket.on('msg_recvd', (data) => {
    let li = document.createElement('li')
    li.innerText = data.msg
    msgList.appendChild(li)
})