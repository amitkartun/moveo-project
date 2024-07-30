const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const codeBlockRoutes = require('./routes/codeBlockRoutes');
const errorHandler = require('./middleware/errorHandler');
const socketManager = require('./websockets/socketManager');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors()); // Enable CORS
app.use(express.json());

// Routes
app.use('/api/codeblocks', codeBlockRoutes);

// WebSocket setup
socketManager(io);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // have changed from 3000 to 5000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));