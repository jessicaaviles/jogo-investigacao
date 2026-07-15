import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Helper to generate a 6 character code
const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { hostUserId } = req.body;
    
    // In a real app we'd fetch the case version. 
    // Here we hardcode or mock the case fetching since there's no seed yet.
    // For MVP1 we can assume a dummy case exists, or we create it if it doesn't.
    let caseVersion = await prisma.case_versions.findFirst();
    
    if (!caseVersion) {
      // Seed a dummy case if none exists
      const dummyCase = await prisma.cases.create({
        data: {
          slug: 'o-presente-desaparecido',
          title: 'O Presente Desaparecido',
          short_synopsis: 'Um presente sumiu antes da festa.',
          case_type: 'quick',
          difficulty: 'easy',
          estimated_duration_minutes: 30,
          min_players: 2,
          max_players: 6,
          tension_level: 1,
          status: 'published'
        }
      });
      caseVersion = await prisma.case_versions.create({
        data: {
          case_id: dummyCase.id,
          version_number: '1.0',
          opening: JSON.stringify({ text: "O presente sumiu!" }),
          master_style: JSON.stringify({ tone: "misterious" }),
          scoring_rules: JSON.stringify({}),
          solution_summary_encrypted: 'dummy_encrypted',
          full_solution_encrypted: 'dummy_encrypted',
          chronology_encrypted: JSON.stringify([]),
          publication_status: 'published'
        }
      });
    }

    const publicCode = generateRoomCode();
    const recoveryCode = crypto.randomBytes(4).toString('hex');
    const recoveryCodeHash = crypto.createHash('sha256').update(recoveryCode).digest('hex');

    const room = await prisma.rooms.create({
      data: {
        public_code: publicCode,
        recovery_code_hash: recoveryCodeHash,
        host_user_id: hostUserId,
        case_version_id: caseVersion.id,
        status: 'LOBBY',
        settings: JSON.stringify({
          turn_order_mode: "random_fixed",
          vote_rule: "simple_majority"
        }),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    });

    res.json({
      success: true,
      data: {
        roomId: room.id,
        publicCode: room.public_code,
        recoveryCode: recoveryCode // Only returned once!
      }
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const joinRoom = async (req: Request, res: Response) => {
  try {
    const { publicCode, userId, displayName } = req.body;

    const room = await prisma.rooms.findUnique({
      where: { public_code: publicCode }
    });

    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }

    if (room.status !== 'LOBBY') {
      return res.status(400).json({ success: false, error: 'Game already started' });
    }

    // Check player count
    const playerCount = await prisma.room_players.count({
      where: { room_id: room.id, removed_at: null }
    });

    if (playerCount >= room.max_players) {
      return res.status(400).json({ success: false, error: 'Room is full' });
    }

    // Upsert player
    const player = await prisma.room_players.upsert({
      where: {
        room_id_anonymous_user_id: {
          room_id: room.id,
          anonymous_user_id: userId
        }
      },
      update: {
        display_name: displayName,
        connection_status: 'CONNECTED',
        last_seen_at: new Date()
      },
      create: {
        room_id: room.id,
        anonymous_user_id: userId,
        display_name: displayName,
        is_host: room.host_user_id === userId,
        connection_status: 'CONNECTED',
        ready_status: 'NOT_READY'
      }
    });

    res.json({
      success: true,
      data: {
        roomId: room.id,
        playerId: player.id,
        isHost: player.is_host
      }
    });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
