import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, Scan } from 'lucide-react';
import { analyzeEvidenceApi } from '../services/aiApi';

const EvidenceAnalysis: React.FC = () => {
  
  const { evidenceId } = useParams();
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);
  const [aiError, setAiError] = useState('');

  const allEvidences = [
    { id: 'fireplace', type: 'Documento', title: 'Carta Anônima', content: 'Vocês pensam que sabem a verdade. Mas a casa guarda o que vocês preferem esquecer.', foundAt: 'Sala de Estar', date: '12/05/1994' },
    { id: 'armchair', type: 'Item Físico', title: 'Chave do Quarto 7', content: 'Uma chave de metal dourada, pesada, com o número 7 entalhado.', foundAt: 'Sala de Estar', date: '13/05/1994' },
    { id: 'window', type: 'Foto', title: 'Foto da Família', content: 'Retrato antigo rasgado no meio. O rosto de uma pessoa foi riscado com caneta.', foundAt: 'Sala de Estar', date: '13/05/1994' },
    { id: 'table', type: 'Documento', title: 'Diário de Elisa', content: '2 de maio. Eu vi o homem de chapéu novamente. Ele fica observando o jardim da casa ao lado.', foundAt: 'Sala de Estar', date: '14/05/1994' },
    { id: 'blood', type: 'Material Orgânico', title: 'Mancha de Sangue', content: 'Vestígio bioluminescente sob luz UV. Formato de arrasto.', foundAt: 'Sala de Estar', date: '15/05/1994' },
  ];

  const mockEvidence = allEvidences.find(e => e.id === evidenceId) || allEvidences[0];

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setAiError('');
    try {
      const result = await analyzeEvidenceApi({
        evidenceId: mockEvidence.id,
        title: mockEvidence.title,
        desc: mockEvidence.content,
        type: mockEvidence.type
      });
      setAiReport({ summary: result, points: [], hypothesis: '' });
    } catch (err) {
      setAiError('A máquina do laboratório falhou.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="layout" style={{ backgroundColor: '#0F1417', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '96px' }}>
      <header style={{ padding: '80px 24px 24px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Análise de Evidência</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', margin: '4px 0', color: '#F8F9FA', fontWeight: 400 }}>{mockEvidence.title}</h1>
      </header>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        
        {/* Evidence Visual */}
        <div style={{ background: '#e8e4d9', padding: '24px', borderRadius: '12px', color: '#1a1a1a', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Kalam", cursive', fontSize: '18px', textAlign: 'center', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)', marginBottom: '24px' }}>
          "{mockEvidence.content}"
        </div>

        {/* Metadata */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase' }}>Localização</div>
            <div style={{ color: '#fff', fontSize: '14px' }}>{mockEvidence.foundAt}</div>
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase' }}>Data da descoberta</div>
            <div style={{ color: '#fff', fontSize: '14px' }}>{mockEvidence.date}</div>
          </div>
        </div>

        {/* AI Action Area */}
        {!aiReport && (
          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            style={{ 
              width: '100%', backgroundColor: 'var(--olive)', color: 'var(--paper)', border: 'none', padding: '16px', borderRadius: '12px', 
              fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: analyzing ? 'not-allowed' : 'pointer', opacity: analyzing ? 0.7 : 1, textTransform: 'uppercase', letterSpacing: '1px'
            }}
          >
            {analyzing ? (
              <>Processando análise forense...</>
            ) : (
              <><Scan size={20} /> Solicitar Análise da IA</>
            )}
          </button>
        )}

        {aiError && (
          <div style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.2)', marginBottom: '24px', fontSize: '13px' }}>
            {aiError}
          </div>
        )}

        {/* AI Report */}
        {aiReport && (
          <div style={{ backgroundColor: '#13191C', border: '1px solid rgba(197, 168, 128, 0.3)', borderRadius: '12px', padding: '24px', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C5A880', marginBottom: '16px' }}>
              <Brain size={24} />
              <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 400 }}>Parecer Forense</h3>
            </div>
            
            <div style={{ color: '#F8F9FA', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {aiReport.summary}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EvidenceAnalysis;
