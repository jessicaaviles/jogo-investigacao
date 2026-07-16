import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Key } from 'lucide-react';

const LobbyList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="lobby-list-page" style={{
      minHeight: '100vh',
      backgroundColor: '#0F1417',
      color: '#F8F9FA',
      padding: '24px 24px 96px 24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(197, 168, 128, 0.08)',
        border: '1px solid rgba(197, 168, 128, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C5A880',
        marginBottom: '24px'
      }}>
        <Users size={32} strokeWidth={1.5} />
      </div>

      <span style={{ color: '#C5A880', fontSize: '10px', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>
        LOBBY DE INVESTIGAÇÃO
      </span>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', fontWeight: 400, margin: '0 0 12px 0', maxWidth: '80%' }}>
        Nenhuma sala ativa
      </h1>
      <p style={{ color: '#8E989F', fontSize: '14px', lineHeight: 1.5, margin: '0 0 32px 0', maxWidth: '80%', fontWeight: 300 }}>
        Para acessar o painel de lobby sincronizado em tempo real, você deve estar dentro de uma investigação ativa com a sua equipe.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '280px' }}>
         <button className="btn-primary"
          onClick={() => navigate('/cases')}
          style={{
            backgroundColor: '#C5A880',
            color: '#0F1417',
            border: 'none',
            padding: '16px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '13px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Plus size={16} /> Criar nova sala
        </button>
        
        <button 
          onClick={() => navigate('/join')}
          style={{
            backgroundColor: 'transparent',
            color: '#F8F9FA',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '14px',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Key size={16} /> Entrar com código
        </button>
      </div>
    </div>
  );
};

export default LobbyList;
