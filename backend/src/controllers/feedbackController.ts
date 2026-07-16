import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashToken } from '../security/secrets';

const prisma = new PrismaClient();

export const submitFeedback = async (req: Request, res: Response) => {
  const { roomId, userId, rating, fairSolution, masterError, confusion, playAnother, recommendationScore, bestMoment, worstMoment, hardestPart } = req.body;
  const numericRating = Number(rating);
  if (!roomId || !userId || !Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ success: false, error: 'Invalid feedback' });
  }
  try {
    const player = await prisma.room_players.findFirst({ where: { room_id: roomId, anonymous_user_id: userId } });
    const room = await prisma.rooms.findUnique({ where: { id: roomId } });
    if (!player || !room || !['GAME_OVER', 'COMPLETED'].includes(room.status)) return res.status(403).json({ success: false, error: 'Feedback is only available after the game' });
    const result = await prisma.feedback.upsert({
      where: { room_id_anonymous_player_hash: { room_id: roomId, anonymous_player_hash: hashToken(userId) } },
      update: { rating: numericRating, fair_solution: Boolean(fairSolution), master_error: Boolean(masterError), confusion: Boolean(confusion), play_another: Boolean(playAnother), recommendation_score: Number(recommendationScore) || numericRating, best_moment: String(bestMoment || '').slice(0, 500) || null, worst_moment: String(worstMoment || '').slice(0, 500) || null, hardest_part: String(hardestPart || '').slice(0, 500) || null },
      create: { room_id: roomId, anonymous_player_hash: hashToken(userId), rating: numericRating, fair_solution: Boolean(fairSolution), master_error: Boolean(masterError), confusion: Boolean(confusion), play_another: Boolean(playAnother), recommendation_score: Number(recommendationScore) || numericRating, best_moment: String(bestMoment || '').slice(0, 500) || null, worst_moment: String(worstMoment || '').slice(0, 500) || null, hardest_part: String(hardestPart || '').slice(0, 500) || null }
    });
    res.json({ success: true, data: { id: result.id } });
  } catch { res.status(500).json({ success: false, error: 'Could not save feedback' }); }
};
