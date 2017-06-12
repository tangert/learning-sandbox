const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const server = require('http').Server(app);

//websocket
var io = require('socket.io')(server);
// socket.io demo
io.on('connection', function (socket) {
  socket.emit('server event', { foo: 'bar' });
  socket.on('client event', function (data) {
    console.log(data);
  });
});

app.get('/api', function (req, res) {
  console.log('WOOHOO WE WORKIN!!!');
});

app.use(function(req, res) {
    res.status(404).send('Sorry cant find that!');
});

module.exports = app;
