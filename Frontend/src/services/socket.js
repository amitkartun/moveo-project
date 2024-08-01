import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

let socket;

// Initiates a WebSocket connection and joins a specific room
export const initiateSocket = (roomId) => {
  socket = io(SOCKET_URL);
  console.log('Connecting socket...');
  if (socket && roomId) socket.emit('join room', roomId);
};

// Disconnects the WebSocket connection
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

// Subscribes to code update events from the WebSocket server
export const subscribeToCodeUpdates = (cb) => {
  if (!socket) return true;
  socket.on('code updated', (code) => {
    console.log('Websocket event received!');
    return cb(null, code);
  });
};

// Sends a code update event to the WebSocket server
export const sendCodeUpdate = (roomId, code) => {
  if (socket) socket.emit('code change', { roomId, code });
};

// Subscribes to role assignment events from the WebSocket server
export const subscribeToRoleAssignment = (cb) => {
  if (!socket) return true;
  socket.on('role assigned', (role) => {
    console.log('Role assigned:', role);
    return cb(null, role);
  });
};