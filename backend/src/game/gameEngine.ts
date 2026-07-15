import { PrismaClient } from '@prisma/client';
import { askMaster } from '../ai/aiManager';

const prisma = new PrismaClient();

export const startGame = async (roomId: string, userId: string) => {
  // Logic to start the game
  const room = await prisma.rooms.findUnique({
    where: { id: roomId },
    include: { players: true }
  });

  if (!room || room.host_user_id !== userId) return null;

  await prisma.rooms.update({
    where: { id: roomId },
    data: { status: 'PLAYING', current_round: 1 }
  });

  // Create first turn for player 1
  const firstPlayer = room.players[0];
  const newTurn = await prisma.turns.create({
    data: {
      room_id: roomId,
      player_id: firstPlayer.id,
      round_number: 1,
      order_index: 0,
      status: 'ACTIVE',
      started_at: new Date()
    }
  });

  await prisma.rooms.update({
    where: { id: roomId },
    data: { current_turn_id: newTurn.id }
  });

  return await prisma.rooms.findUnique({
    where: { id: roomId },
    include: { players: true, turns: true }
  });
};

export const submitQuestion = async (roomId: string, userId: string, questionText: string) => {
  const room = await prisma.rooms.findUnique({
    where: { id: roomId },
    include: { players: true, turns: { orderBy: { created_at: 'desc' }, take: 1 } }
  });

  if (!room || room.turns.length === 0) return { success: false, error: 'Game not started' };

  const currentTurn = room.turns[0];
  const player = room.players.find(p => p.anonymous_user_id === userId);

  if (currentTurn.player_id !== player?.id) {
    return { success: false, error: 'Not your turn' };
  }

  // Ask AI
  // TODO: Get real facts for the room case
  const facts = 'O presente sumiu do cofre. A janela estava aberta.';
  const aiResponse = await askMaster(questionText, facts);

  const question = await prisma.questions.create({
    data: {
      room_id: roomId,
      turn_id: currentTurn.id,
      player_id: player.id,
      sequence_number: 1, // simplified
      original_text: questionText,
      status: 'PROCESSED',
      processed_at: new Date()
    }
  });

  const masterAnswer = await prisma.master_answers.create({
    data: {
      question_id: question.id,
      classification: 'UNKNOWN', // Simplified
      factual_payload: JSON.stringify({}),
      rendered_text: aiResponse || '...',
      validation_status: 'VALIDATED'
    }
  });

  return { success: true, data: { question, answer: masterAnswer } };
};

export const passTurn = async (roomId: string, userId: string) => {
  // Simplified logic
  return null;
};
