import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAnonymousUser } from '../services/api';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate anonymous token on first load if it doesn't exist
    const token = localStorage.getItem('deviceToken');
    if (!token) {
      registerAnonymousUser().then((res) => {
        if (res.success) {
          localStorage.setItem('deviceToken', res.data.deviceToken);
          localStorage.setItem('userId', res.data.userId);
        }
      });
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundImage: `url(/src/assets/hero.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {/* Overlay gradiente */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(18,20,19,0.3) 0%, rgba(18,20,19,0.8) 60%, rgba(18,20,19,1) 100%)',
        zIndex: 0
      }}></div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-tertiary)', border: '2px solid var(--text-accent)' }}></div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 500, fontFamily: 'var(--font-serif)' }}>Investigador</div>
              <div style={{ fontSize: '12px', color: 'var(--text-accent)' }}>Nível Inicial</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '80px' }}>
          <h5 style={{ color: 'var(--text-accent)', letterSpacing: '2px', fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
            CASO RECOMENDADO
          </h5>
          <h1 style={{ fontSize: '42px', lineHeight: 1.1, marginBottom: '16px', fontFamily: 'var(--font-serif)', maxWidth: '80%' }}>
            O Segredo de Blackwell House
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '85%' }}>
            Uma carta anônima. Uma casa isolada. Muitas perguntas.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto', marginBottom: '32px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '32px', marginBottom: '8px' }}>Escolha o Modo</p>
          <button 
            className="btn-primary" 
            onClick={() => navigate('/create')}
            disabled={loading}
          >
            Multiplayer (Criar Sala)
            <span>→</span>
          </button>

          <button 
            className="btn-primary" 
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-light)' }}
            onClick={() => navigate('/join')}
            disabled={loading}
          >
            Entrar com Código
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
