import express from 'express';
import { createRoom, joinRoom, recoverRoom, listCases } from '../controllers/roomController';

const router = express.Router();
router.get('/cases', listCases);

router.post('/rooms', createRoom);
router.post('/rooms/join', joinRoom);
router.post('/rooms/recover', recoverRoom);

export default router;
