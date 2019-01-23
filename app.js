const express = require('express');
const socket = require('socket.io');
const app = express()
let server = app.listen(process.env.PORT || 8000, () => { console.log('listen port 8000') })
let io = socket(server)


app.use(express.static('public'))


let qnaarr = ["Hello, please enter the number of the question (1-5). ", "1. Can I make a reservation?", "2. Do you deliver / do carry-outs?", "3. Opening & Closing Hour", "4. Do you have a vegetarian / gluten free option?", "5. Where's the location?"]

io.on('connection', function (socket) {

    socket.on('subscribe', function (room) {
        console.log('joining room', room);
        socket.join(room);

        for (question of qnaarr) {

            io.sockets.in(room).emit('pm', {
                handle: "Annie",
                message: question
            })
        }
    });



    socket.on('chat', function (data) {   //actions when receieve command (on) from socket
        console.log('getting incomming chat from room ', data.room)
        console.log('User request: ', data.message)
        switch (data.message) {
            case '1':
                io.sockets.in(data.room).emit('pm', {
                    handle: "Annie",
                    message: `Unfortunately, we do not accept reservations.   We offer first-come, first-serve.`

                })
                break;
            case '2':
                io.sockets.in(data.room).emit('pm', {
                    handle: "Annie",
                    message: `We do for lunch services.  We are dine-in only during dinner hours.  We want you to eat ramen noodles al dente and broth steaming hot.   For that reason, we recommend dine-in.  `

                })
                break;
            case '3':
                io.sockets.in(data.room).emit('pm', {
                    handle: "Annie",
                    message: `Mon - Sun: 11:30 - 22:30`

                })
                break;
            case '4':
                io.sockets.in(data.room).emit('pm', {
                    handle: "Annie",
                    message: `Yes we do.   Please ask our servers a few options.`

                })
                break;
            case '5':
                io.sockets.in(data.room).emit('pm', {
                    handle: "Annie",
                    message: `Shop G814, Yuen Kung Mansion,, 108 Taikoo Shing Road, Taikoo Shing`

                })
                break;
            default:
                io.sockets.in(data.room).emit('pm', {
                    handle: "Annie",
                    message: `Sorry I dont understand, please enter the Number of the question :(`

                })
        }

    })

})