import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { submitFeedback } from '../services/api';

const Feedback: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [fair, setFair] = useState(true);
  const [playAnother, setPlayAnother] = useState(true);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!roomId || !rating) return setError('Escolha uma nota para continuar.');
    setLoading(true);
    const response = await submitFeedback({ roomId, userId: localStorage.getItem('userId') || '', rating, fairSolution: fair, masterError: false, confusion: false, playAnother, recommendationScore: rating });
    if (response.success) setSent(true); else setError(response.error || 'Não foi possível registrar o feedback.');
    setLoading(false);
  };

  const cardStyle = {
    backgroundColor: 'rgba(15, 20, 23, 0.7)',
    border: '1px solid rgba(184,153,83,.3)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    height: 'max-content',
    margin: '0'
  };

  const labelStyle = { display: 'block', color: 'var(--gold-soft)', fontSize: '10px', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', marginBottom: '12px' } as any;

  return (
    <div className="immersive-page" style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0F1417',
      backgroundImage: `url(/backgrounds/equipe-investigadores.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
      padding: '112px 24px 24px 24px', // 88px (header) + 24px (margem)
      minHeight: '100vh',
      boxSizing: 'border-box'
    }}>
      {sent ? (
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px', color: 'var(--accent-gold)' }}>✓</div>
          <span style={labelStyle}>Registro concluído</span>
          <h2 style={{ fontSize: '24px', marginBottom: '12px', fontFamily: 'var(--font-serif)', fontWeight: 400, color: '#F8F9FA' }}>Obrigado por investigar.</h2>
          <p style={{ color: '#8E989F', fontSize: '13px', lineHeight: 1.5, marginBottom: '24px' }}>Seu feedback ajuda a calibrar os próximos casos.</p>
          <button 
            onClick={() => navigate('/')}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: 'var(--accent-gold)', color: '#000', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
          >
            Voltar ao Arquivo
          </button>
        </div>
      ) : (
        <div style={cardStyle}>
          <span style={labelStyle}>Pós-Investigação</span>
          <h2 style={{ fontSize: '24px', marginBottom: '8px', fontFamily: 'var(--font-serif)', fontWeight: 400, color: '#F8F9FA' }}>Como foi a experiência?</h2>
          <p style={{ color: '#8E989F', fontSize: '12px', lineHeight: 1.5, marginBottom: '24px' }}>Avalie o caso para ajudar a central a melhorar as próximas missões.</p>
          
          <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ ...labelStyle, marginBottom: '8px', color: 'rgba(255,255,255,0.5)' }}>Sua nota geral</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map(value => (
                  <button 
                    type="button" 
                    key={value}
                    onClick={() => setRating(value)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '32px',
                      cursor: 'pointer',
                      color: rating >= value ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)',
                      transition: 'color 0.2s',
                      padding: 0
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={fair} onChange={e => setFair(e.target.checked)} style={{ accentColor: 'var(--accent-gold)', width: '18px', height: '18px' }} />
                A solução me pareceu justa
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', cursor: 'pointer' }}>
                <input type="checkbox" checked={playAnother} onChange={e => setPlayAnother(e.target.checked)} style={{ accentColor: 'var(--accent-gold)', width: '18px', height: '18px' }} />
                Eu jogaria outro caso
              </label>
            </div>

            {error && (
              <div style={{ color: '#ff6b6b', fontSize: '13px', textAlign: 'center' }}>{error}</div>
            )}

            <button 
              type="submit" 
              disabled={loading || rating === 0}
              style={{ width: '100%', padding: '14px', borderRadius: '8px', border: 'none', backgroundColor: (loading || rating === 0) ? 'rgba(255,255,255,0.1)' : 'var(--accent-gold)', color: (loading || rating === 0) ? 'rgba(255,255,255,0.3)' : '#000', fontWeight: 700, fontSize: '14px', cursor: (loading || rating === 0) ? 'default' : 'pointer', marginTop: '8px', transition: 'all 0.2s' }}
            >
              {loading ? 'Enviando...' : 'Enviar Feedback'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Feedback;
