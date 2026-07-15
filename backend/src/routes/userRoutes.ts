import express from 'express';
import { createUser, validateUser } from '../controllers/userController';
// import { createRoom, joinRoom } from '../controllers/roomController'; // TODO

const router = express.Router();

router.post('/anonymous-users', createUser);
router.post('/anonymous-users/validate', validateUser);

export default router;
