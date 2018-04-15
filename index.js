//To do list:
//create landing page - choose display name and room name
// add sending location func inside chat room
// install socket IO

const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIo = require('socket.io')
const axios = require('axios');

app.use(express.static(path.resolve(__dirname, './client/build')));

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', (socket) => {   
    socket.on('my other event', (data) => {        
        io.emit('message', {sender:data.sender, body:data.message});
    });    
});

app.get('/',(req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

server.listen(5000,() => {
    console.log('app is running');
} );
