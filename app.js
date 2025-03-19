const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    console.log('Client connected', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
    socket.on('abcd', function(data){
        //io.emit('efgh', "Connected to backend");         // send to all clients
        socket.emit('efgh', "Connected to backend");       // send to the client who sent the event
        console.log('abcd event received', data);
    });
    socket.on("typing", function(){
        socket.broadcast.emit("typing", "Hi, someone is typing...");   // broadcast data to all clients except the one who sent the event
    });

    socket.on("custom event", function(data){
        console.log("Custom event received", data);
        socket.emit("custom event", data);
    });



    // to create rooms
    // socket.join('room1');

});

app.get('/', (req, res) => {
    res.render('index');
});

// to send an event from frontend - socket.emit("event name", data);
// to send data from backend - io.emit("event name", data); -- sabko bhejo, socket.emit("event name", data); -- sirf khud ko bhejo

server.listen(3000);   // listen to the server which is created for socket io