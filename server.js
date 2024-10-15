const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let firstClicker = null;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('buzz', () => {
    if (!firstClicker) {
      firstClicker = socket.id;
      io.emit('winner', firstClicker);
    }
  });

  socket.on('reset', () => {
    firstClicker = null;
    io.emit('reset');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
