import { Router } from 'express';
import { postEvidenceAnalysis } from '../controllers/aiController';

const router = Router();

router.post('/evidence-analysis', postEvidenceAnalysis);

export default router;
