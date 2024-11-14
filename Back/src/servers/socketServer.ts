import { Server } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { addAttack, getMissileDetails, getUserByToken } from './server';
import { error } from 'console';

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Join a room
    socket.on('join', (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    // Leave a room
    socket.on('leave', (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    // Get user details by token and send to room
    socket.on("getUserDetailsByToken", async (room: string, token: string) => {
      try {
        const user = await getUserByToken(token); 
        if (!user) {
          socket.to(room).emit("getUserDetailsByToken", { error: "User not found" });
          return;
        }

      
        io.to(room).emit("getUserDetailsByToken", user);
      } catch (error) {
        console.error("Error in getUserDetailsByToken:", error);
        socket.to(room).emit("getUserDetailsByToken", { error: "Internal server error" });
      }
    });

    socket.on("getMissileDetails",async (room:string,nameOfMissile:string)=>{
        try {
            const missile = await getMissileDetails(nameOfMissile)
            if(!missile){
                socket.emit("getMissileDetails",{error:"no missile "})
                return
            }
            io.to(room).emit("getMissileDetails",missile)
        } catch (error) {
            
        }

    })
socket.on("createAttack",async(room:string, token: string,nameOfMissile: string,direction: string)=>{
 const createAttack = await addAttack(token,nameOfMissile,direction)
 if(!createAttack){
    socket.emit("createAttack",{error:"cont create  attack"})
    return
 }
    io.to(room).emit("createAttack",createAttack)
}
)
    // Broadcast to all except sender
    socket.on('broadcast', (message) => {
      socket.broadcast.emit('broadcast-message', message);  // Emit message to all except sender
      console.log(`Broadcast message sent:`, message);
    });

    // Acknowledgement example
    socket.on('request', (data, callback) => {
      console.log('Request received', data);
      callback({ status: 'OK' });  // Acknowledge the request
    });

    // Volatile event example (heartbeat)
    setInterval(() => {
      socket.volatile.emit('heartbeat', { time: new Date().toISOString() });  // Emit heartbeat every second
    }, 1000);

    socket.on('disconnect', (reason) => {
      console.log('A user disconnected', socket.id, 'reason:', reason);
    });
  });

  return io;
}
