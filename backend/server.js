const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// When a client connects
io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);

    // Send welcome message to this user
    socket.emit('message', { sender: 'System', text: `Welcome to room ${roomId}` });

    // Broadcast when a user connects
    socket.broadcast.to(roomId).emit('message', {
      sender: 'System',
      text: 'A user has joined the chat',
    });

    // Handle chat messages
    socket.on('chatMessage', (msg) => {
      io.to(roomId).emit('message', msg);
    });

    // Handle drawing on the whiteboard
    socket.on('drawing', (data) => {
      socket.broadcast.to(roomId).emit('drawing', data.object);
    });

    // Broadcast when a user disconnects
    socket.on('disconnect', () => {
      io.to(roomId).emit('message', {
        sender: 'System',
        text: 'A user has left the chat',
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
