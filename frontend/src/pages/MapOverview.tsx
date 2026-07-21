import React from 'react';
import { useNavigate } from 'react-router-dom';

const MapOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="layout" style={{ 
      backgroundImage: 'url(/backgrounds/map_blackwell.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Overlay gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.9) 100%)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100vh', padding: '80px 24px 96px 24px' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
          <span style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Caso Ativo</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', margin: '4px 0', lineHeight: 1.1, color: '#F8F9FA' }}>O Segredo de<br/>Blackwell House</h1>
          <p style={{ color: '#8E989F', fontSize: '13px', maxWidth: '280px', marginTop: '8px', marginBottom: '24px' }}>Explore os locais, encontre pistas e descubra o que realmente aconteceu.</p>
          
          {/* Progress */}
          <div style={{ backgroundColor: '#13191C', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#8E989F', textTransform: 'uppercase', letterSpacing: '1px' }}>Progresso da Investigação</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px', width: '80px' }}>
                <div style={{ height: '100%', width: '68%', backgroundColor: '#C5A880', borderRadius: '2px' }} />
              </div>
              <span style={{ color: '#F8F9FA', fontWeight: 600, fontSize: '12px' }}>68%</span>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: 'auto' }}>
          <button style={{ background: 'none', border: 'none', borderBottom: '2px solid #C5A880', color: '#C5A880', padding: '12px 0', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Mapa</button>
          <button onClick={() => navigate('/case-files/active')} style={{ background: 'none', border: 'none', color: '#8E989F', padding: '12px 0', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Pistas</button>
          <button onClick={() => navigate('/board/active')} style={{ background: 'none', border: 'none', color: '#8E989F', padding: '12px 0', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' }}>Mural</button>
        </div>

        {/* Map Pins */}
        <div style={{ flex: 1, position: 'relative', marginTop: '16px' }}>
          {/* Sala de Estar */}
          <div style={{ position: 'absolute', top: '55%', left: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/scene/sala-de-estar')}>
            <div style={{ backgroundColor: '#13191C', border: '1px solid #C5A880', padding: '6px 10px', borderRadius: '8px', marginBottom: '6px', textAlign: 'center' }}>
              <div style={{ color: '#F8F9FA', fontSize: '13px', fontFamily: 'var(--font-serif)' }}>Sala de Estar</div>
              <div style={{ color: '#C5A880', fontSize: '10px' }}>4/5 pistas</div>
            </div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#C5A880', boxShadow: '0 0 15px #C5A880', border: '2px solid rgba(255,255,255,0.8)' }} />
          </div>

          {/* Quarto 7 */}
          <div style={{ position: 'absolute', top: '25%', left: '55%', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.7 }}>
            <div style={{ backgroundColor: '#13191C', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 10px', borderRadius: '8px', marginBottom: '6px', textAlign: 'center' }}>
              <div style={{ color: '#F8F9FA', fontSize: '13px', fontFamily: 'var(--font-serif)' }}>Quarto 7</div>
              <div style={{ color: '#8E989F', fontSize: '10px' }}>Trancado</div>
            </div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)', border: '2px solid rgba(255,255,255,0.5)' }} />
          </div>
        </div>

        {/* Bottom Panel */}
        <div style={{ backgroundColor: '#13191C', borderRadius: '16px', padding: '12px', display: 'flex', gap: '12px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '16px', alignItems: 'center' }}>
          <img src="/backgrounds/scene_living_room.png" alt="Preview" style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ color: '#C5A880', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Local em Destaque</div>
            <div style={{ color: '#F8F9FA', fontSize: '16px', fontFamily: 'var(--font-serif)', marginBottom: '2px' }}>Sala de Estar</div>
            <div style={{ color: '#8E989F', fontSize: '11px', lineHeight: 1.3 }}>Principal ponto de encontro.</div>
          </div>
          <button onClick={() => navigate('/scene/sala-de-estar')} style={{ backgroundColor: 'var(--olive)', color: 'var(--paper)', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase' }}>
            Explorar
          </button>
        </div>

      </div>
    </div>
  );
};

export default MapOverview;
