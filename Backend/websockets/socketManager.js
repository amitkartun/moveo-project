const codeBlocks = require('../mockData/codeBlocks');

module.exports = (io) => {
  const rooms = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join room', (roomId) => {
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

    socket.on('code change', ({ roomId, code }) => {
      const room = rooms.get(roomId);
      if (room && room.students.has(socket.id)) {
        socket.to(roomId).emit('code updated', code);
        // Update mock data (replace with DB update later)
        const codeBlock = codeBlocks.find(block => block.id === roomId);
        if (codeBlock) {
          codeBlock.code = code;
        }
        console.log(`Code updated in room ${roomId}`);
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



//---------------------------------------------------------version after trying dealing with real time code changing - NOT WORKING!


// const codeBlocks = require('../mockData/codeBlocks');

// module.exports = (io) => {
//   const rooms = new Map();

//   io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('join room', (roomId) => {
//       socket.join(roomId);
      
//       if (!rooms.has(roomId)) {
//         rooms.set(roomId, { mentor: socket.id, students: new Set() });
//       } else {
//         rooms.get(roomId).students.add(socket.id);
//       }

//       const role = rooms.get(roomId).mentor === socket.id ? 'mentor' : 'student';
//       socket.emit('role assigned', role);

//       console.log(`Client ${socket.id} joined room ${roomId} as ${role}`);
//     });

//     socket.on('code change', ({ roomId, code }) => {
//       const room = rooms.get(roomId);
//       if (room && (room.students.has(socket.id) || room.mentor === socket.id)) {
//         socket.to(roomId).emit('code updated', code);
//         // Update mock data (replace with DB update later)
//         const codeBlock = codeBlocks.find(block => block.id === roomId);
//         if (codeBlock) {
//           codeBlock.code = code;
//         }
//         console.log(`Code updated in room ${roomId}`);
//       }
//     });

//     socket.on('disconnect', () => {
//       rooms.forEach((room, roomId) => {
//         if (room.mentor === socket.id) {
//           room.mentor = null;
//         } else {
//           room.students.delete(socket.id);
//         }
        
//         if (!room.mentor && room.students.size === 0) {
//           rooms.delete(roomId);
//         }
//       });
//       console.log('Client disconnected');
//     });
//   });
// };
