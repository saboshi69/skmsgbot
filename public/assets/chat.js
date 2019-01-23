//front end connection


let socket = io.connect('https://skmsgbot.herokuapp.com')
let message = document.querySelector("#message")
let btn = document.querySelector("#send")
let handle = document.querySelector("#handle")
let output = document.querySelector("#output")
let chatwindow = document.querySelector("#chat-window")



let conversation_id = "" + Math.random()
socket.emit('subscribe', conversation_id);


//submit events to io 
btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        room: conversation_id
    })

    output.innerHTML += '<p><strong>' + handle.value + ': </strong>' + message.value + '</p>'
    chatwindow.scrollTop = chatwindow.scrollHeight
    message.value = ''
})

message.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
        socket.emit('chat', {
            message: message.value,
            handle: handle.value,
            room: conversation_id
        })

        output.innerHTML += '<p><strong>' + handle.value + ': </strong>' + message.value + '</p>'
        chatwindow.scrollTop = chatwindow.scrollHeight
        message.value = ''
    }
})


// message.addEventListener('keypress', function(){
//     if (event.keyCode !== 13){
//         socket.emit('isTyping', handle.value)
//     }
// })



//listen events from io
socket.on('pm', function (data) {

    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>'
    chatwindow.scrollTop = chatwindow.scrollHeight
})



// socket.on('isTyping', function(data){
//     console.log('hello')
//     echo.innerHTML = '<p><em>'+ data +' is typing a message... </em></p>'
// })

