import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import { startGame, submitQuestion, passTurn } from '../game/gameEngine';

const prisma = new PrismaClient();

export const setupSockets = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    
    socket.on('join_room', async ({ roomId, userId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
      
      // Emit the latest room state
      const room = await prisma.rooms.findUnique({
        where: { id: roomId },
        include: {
          players: true,
          turns: { orderBy: { created_at: 'desc' }, take: 1 }
        }
      });
      if (room) {
        io.to(roomId).emit('room_state_updated', room);
      }
    });

    socket.on('start_game', async ({ roomId, userId }) => {
      // Validate host and start game
      const newRoomState = await startGame(roomId, userId);
      if (newRoomState) {
        io.to(roomId).emit('game_started', newRoomState);
      }
    });

    socket.on('submit_question', async ({ roomId, userId, questionText }) => {
      try {
        const result = await submitQuestion(roomId, userId, questionText);
        if (result.success) {
          io.to(roomId).emit('question_processed', result.data);
        } else {
          socket.emit('error', result.error);
        }
      } catch(e) {
        console.error(e);
      }
    });

    socket.on('pass_turn', async ({ roomId, userId }) => {
      const newTurn = await passTurn(roomId, userId);
      if (newTurn) {
        io.to(roomId).emit('turn_passed', newTurn);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
