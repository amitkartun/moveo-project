const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const codeBlockRoutes = require('./routes/codeBlockRoutes');
const errorHandler = require('./middleware/errorHandler');
const socketManager = require('./websockets/socketManager');
const connectDB = require('./config/database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json());

// Serve static files from the React frontend app 
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/codeblocks', codeBlockRoutes);

// WebSocket setup
socketManager(io);

// After your routes, add this block to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT; 
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));