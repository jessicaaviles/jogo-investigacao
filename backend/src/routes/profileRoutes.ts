import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();
router.get('/profiles/:userId', getProfile);
router.put('/profiles/:userId', updateProfile);
export default router;
