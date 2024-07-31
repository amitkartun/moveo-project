import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

let socket;

export const initiateSocket = (roomId) => {
  socket = io(SOCKET_URL);
  console.log('Connecting socket...');
  if (socket && roomId) socket.emit('join room', roomId);
};

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};

export const subscribeToCodeUpdates = (cb) => {
  if (!socket) return true;
  socket.on('code updated', (code) => {
    console.log('Websocket event received!');
    return cb(null, code);
  });
};

export const sendCodeUpdate = (roomId, code) => {
  if (socket) socket.emit('code change', { roomId, code });
};

export const subscribeToRoleAssignment = (cb) => {
  if (!socket) return true;
  socket.on('role assigned', (role) => {
    console.log('Role assigned:', role);
    return cb(null, role);
  });
};