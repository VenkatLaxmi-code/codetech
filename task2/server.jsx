const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files

// On client connection
io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for messages from clients
    socket.on('send_message', (msg) => {
        console.log('Message received:', msg);
        io.emit('receive_message', msg);  // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server on port 5000
server.listen(5000, () => {
    console.log('Server running on port 5000');
});
