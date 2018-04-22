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
    socket.on('message', (data) =>{        
        io.to(data.room).emit('news',{user:data.sender,message:data.message})
    })     
});

app.post('/login',  (req, res) => {
    let room = req.body.room;
    let user = req.body.user;
    soc.join(room, () =>{           
        res.send('ok');
})})
app.post('/logout', (req, res) => {    
    let room = req.body.room;    
    soc.leave(room, () =>{  });
        res.send('left room');
})

app.get('/',(req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

server.listen(5000,() => {
    console.log('app is running');
} );
