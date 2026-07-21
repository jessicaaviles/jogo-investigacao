import { Request, Response } from 'express';
import { analyzeEvidence } from '../services/aiMaster';

export const postEvidenceAnalysis = async (req: Request, res: Response) => {
  try {
    const { evidenceId, title, desc, type } = req.body;

    if (!evidenceId || !title || !desc) {
      return res.status(400).json({ error: 'Faltam dados da evidência (evidenceId, title, desc)' });
    }

    const analysis = await analyzeEvidence(evidenceId, title, desc, type || 'unknown');

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error('Erro em postEvidenceAnalysis:', error);
    return res.status(500).json({ error: 'Erro ao processar análise da evidência' });
  }
};
