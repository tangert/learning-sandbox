'use strict';
const app = require('./app');
const PORT = process.env.PORT || 3001;
const server = require('http').Server(app);
var io = require('socket.io')(server, { origins: 'http://localhost:3000'});

io.on('connection', function (socket) {
  console.log('hello i am a socket');
  socket.emit('server-connect', { isConnected: 'true' });
  socket.on('client-connect', function (data) {
    console.log('SHOULD RECEIVE A CLIENT EVENT');
    console.log(data);
  });
});

//IT WAS FUCKING ONE WORD.
//CHANGE APP TO SERVER. LOL.
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
