const CodeBlock = require('../models/CodeBlock');

// Export a function to handle WebSocket connections
module.exports = (io) => {

  // Create a map to keep track of rooms and their participants
  const rooms = new Map();

  // Handle a new WebSocket connection
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle a client joining a room
    socket.on('join room', async (roomId) => {
      socket.join(roomId);

      // If the room doesn't exist, create a new room with the current client as the mentor
      if (!rooms.has(roomId)) {
        rooms.set(roomId, { mentor: socket.id, students: new Set() });
      } else {
        // If the room exists, add the current client as a student
        rooms.get(roomId).students.add(socket.id);
      }

      // Determine the role of the client (mentor or student) and emit it to the client
      const role = rooms.get(roomId).mentor === socket.id ? 'mentor' : 'student';
      socket.emit('role assigned', role);

      console.log(`Client ${socket.id} joined room ${roomId} as ${role}`);
    });

    // Handle a code change event from a client
    socket.on('code change', async ({ roomId, code }) => {
      const room = rooms.get(roomId);
      // Ensure the client is a student in the room before broadcasting the code update
      if (room && room.students.has(socket.id)) {
        socket.to(roomId).emit('code updated', code); // Broadcast the updated code to other clients in the room
        try {
          // Update the code block in the database
          await CodeBlock.findByIdAndUpdate(roomId, { code });
          console.log(`Code updated in room ${roomId}`);
        } catch (error) {
          console.error('Error updating code block:', error);
        }
      }
    });

    // Handle a client disconnecting
    socket.on('disconnect', () => {
      // Iterate through all rooms to update their mentor and student lists
      rooms.forEach((room, roomId) => {
        if (room.mentor === socket.id) {
          room.mentor = null; // Remove mentor if the disconnected client was the mentor
        } else {
          room.students.delete(socket.id); // Remove the client from the students set
        }
        
        // Delete the room if it no longer has a mentor or students
        if (!room.mentor && room.students.size === 0) {
          rooms.delete(roomId);
        }
      });
      console.log('Client disconnected');
    });
  });
};