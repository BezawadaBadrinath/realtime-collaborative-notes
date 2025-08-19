const socketIO = require('socket.io');
const User = require('../models/User');

class SocketService {
  constructor() {
    this.io = null;
    this.activeUsers = new Map();
    this.onlineUsers = [];
  }

  init(server) {
    this.io = socketIO(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
      }
    });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          throw new Error('Authentication error: No token provided');
        }

        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
          throw new Error('Authentication error: User not found');
        }

        socket.user = user;
        next();
      } catch (err) {
        next(new Error('Authentication error: ' + err.message));
      }
    });

    this.io.on('connection', (socket) => {
      console.log(`User connected: ${socket.user.username}`);
      this.activeUsers.set(socket.user._id.toString(), socket.user.username);
      this.broadcastUserList();

      socket.on('userConnected', (username) => {
        if (!this.onlineUsers.includes(username)) {
          this.onlineUsers.push(username);
        }
        this.io.emit('onlineUsers', this.onlineUsers);
      });

      // Join a room when a user opens a note
      socket.on('joinNoteRoom', (noteId) => {
        socket.join(noteId);
        // Optionally notify others in the room
        socket.to(noteId).emit('userJoined', socket.id);
      });

      // Leave room when user closes note
      socket.on('leaveNoteRoom', (noteId) => {
        socket.leave(noteId);
        socket.to(noteId).emit('userLeft', socket.id);
      });

      // Broadcast note updates only to users in the same room
      socket.on('updateNote', ({ noteId, note }) => {
        socket.to(noteId).emit('noteUpdated', note);
      });

      // Typing indicator for room
      socket.on('typing', ({ noteId, username }) => {
        socket.to(noteId).emit('userTyping', username);
      });

      socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.user.username}`);
        this.activeUsers.delete(socket.user._id.toString());
        this.onlineUsers = this.onlineUsers.filter(u => u !== socket.user.username);
        this.broadcastUserList();
        this.io.emit('onlineUsers', this.onlineUsers);
      });
    });

    return this.io;
  }

  broadcastUserList() {
    const users = Array.from(this.activeUsers.entries()).map(([id, username]) => ({ id, username }));
    this.io.emit('activeUsers', users);
  }

  getIO() {
    if (!this.io) {
      throw new Error('Socket.io not initialized');
    }
    return this.io;
  }
}

module.exports = new SocketService();