const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIo = require('socket.io')
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(bodyParser.json());

const server = http.createServer(app);

const io = socketIo(server);
let soc;
io.on('connection',  (socket) => {
    soc = socket;     
});

app.post('/login',  (req, res) => {
    let room = req.body.room;
    let user = req.body.user;
    soc.join(room, () =>{
    io.to(room).emit('news',{Admin:`Hello ${user} Welcome to ${room}`});    
    res.send('ok');
})})

app.get('/',(req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

server.listen(5000,() => {
    console.log('app is running');
} );
