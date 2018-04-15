//To do list:
//create landing page - choose display name and room name
// add sending location func inside chat room
// install socket IO

const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

app.listen(5000, () => {
    console.log('App is listening on port 5000');
})

