import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Brain, Scan } from 'lucide-react';

const EvidenceAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { evidenceId } = useParams();
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);

  const mockEvidence = {
    id: evidenceId,
    title: 'Carta Anônima',
    type: 'Documento',
    content: 'Vocês pensam que sabem a verdade. Mas a casa guarda o que vocês preferem esquecer.',
    foundAt: 'Hall de Entrada',
    date: '12/05/1994',
    image: '/images/portraits/default_m.png' // Mock
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate AI delay
    setTimeout(() => {
      setAiReport({
        summary: 'O tipo de papel e a tinta sugerem que foi escrita recentemente, não na época da construção da casa.',
        points: ['Escrita apressada', 'Mancha de café no canto inferior'],
        hypothesis: 'O autor provavelmente estava nervoso e consumindo cafeína enquanto escrevia, indicando premeditação sob estresse.',
      });
      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="layout" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={() => navigate('/case-files/active')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}>
          <ArrowLeft size={20} /> Voltar
        </button>
        <span style={{ color: 'var(--accent-gold)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Análise de Evidência</span>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', margin: '4px 0', color: '#fff' }}>{mockEvidence.title}</h1>
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
              width: '100%', background: 'var(--accent-gold)', color: '#000', border: 'none', padding: '16px', borderRadius: '12px', 
              fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: analyzing ? 'not-allowed' : 'pointer', opacity: analyzing ? 0.7 : 1
            }}
          >
            {analyzing ? (
              <>Processando análise forense...</>
            ) : (
              <><Scan size={20} /> Solicitar Análise da IA</>
            )}
          </button>
        )}

        {/* AI Report */}
        {aiReport && (
          <div style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '24px', animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
              <Brain size={24} />
              <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '18px' }}>Parecer da IA</h3>
            </div>
            
            <p style={{ color: '#fff', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>{aiReport.summary}</p>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>Pontos de Interesse Detectados</div>
              <ul style={{ color: 'var(--accent-gold)', margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                {aiReport.points.map((pt: string, idx: number) => <li key={idx}>{pt}</li>)}
              </ul>
            </div>

            <div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase', marginBottom: '8px' }}>Hipótese Gerada</div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '13px', fontStyle: 'italic', borderLeft: '2px solid var(--accent-gold)' }}>
                {aiReport.hypothesis}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EvidenceAnalysis;
