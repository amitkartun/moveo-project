const CodeBlock = require('../models/CodeBlock');

module.exports = (io) => {
  const rooms = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join room', async (roomId) => {
      socket.join(roomId);
      
      if (!rooms.has(roomId)) {
        rooms.set(roomId, { mentor: socket.id, students: new Set() });
      } else {
        rooms.get(roomId).students.add(socket.id);
      }

      const role = rooms.get(roomId).mentor === socket.id ? 'mentor' : 'student';
      socket.emit('role assigned', role);

      console.log(`Client ${socket.id} joined room ${roomId} as ${role}`);
    });

    socket.on('code change', async ({ roomId, code }) => {
      const room = rooms.get(roomId);
      if (room && room.students.has(socket.id)) {
        socket.to(roomId).emit('code updated', code);
        try {
          await CodeBlock.findByIdAndUpdate(roomId, { code });
          console.log(`Code updated in room ${roomId}`);
        } catch (error) {
          console.error('Error updating code block:', error);
        }
      }
    });

    socket.on('disconnect', () => {
      rooms.forEach((room, roomId) => {
        if (room.mentor === socket.id) {
          room.mentor = null;
        } else {
          room.students.delete(socket.id);
        }
        
        if (!room.mentor && room.students.size === 0) {
          rooms.delete(roomId);
        }
      });
      console.log('Client disconnected');
    });
  });
};