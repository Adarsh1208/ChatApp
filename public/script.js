let socket = io()

//when the page loads
$('#login').show()
$('#chat').hide()

$('#loginBtn').click(() => {
    socket.emit('userLogin', {
        username: $('#userName').val(),
        password: $('#password').val()
    })
})

socket.on('loggedIn', () => {
    $('#login').hide()
    $('#chat').show()
})

socket.on('logInFail', () => {
    window.alert('Username or Password Wrong')
})

$('#sendMsg').click(() => {
    socket.emit('msgSend', {
        to: $('#sendMsgTo').val(),
        msg: $('#userMsg').val()
    })
})

socket.on('msgRcvd', (data) => {
    $('#chatMsg').append($('<li>').text(
        `[${data.from}] : ${data.msg}`
    ))
})

