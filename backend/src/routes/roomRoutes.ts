import express from 'express';
import { createRoom, joinRoom } from '../controllers/roomController';

const router = express.Router();

router.post('/rooms', createRoom);
router.post('/rooms/join', joinRoom);

export default router;
