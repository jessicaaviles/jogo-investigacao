import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Filter, MoreHorizontal } from 'lucide-react';

const InvestigationBoard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for board items
  const items = [
    { id: 'helena', type: 'person', label: 'Helena', image: '/images/portraits/default_f.png', top: '60%', left: '40%', note: 'Amiga próxima' },
    { id: 'clara', type: 'person', label: 'Clara Mendes', image: '/images/portraits/default_f.png', top: '25%', left: '20%', note: 'Desaparecida 12/05' },
    { id: 'tomas', type: 'person', label: 'Sr. Tomás Blackwell', image: '/images/portraits/default_m.png', top: '30%', left: '75%', note: '?' },
    { id: 'house', type: 'location', label: 'Blackwell House', image: '/backgrounds/map_blackwell.png', top: '45%', left: '45%' },
    { id: 'key', type: 'item', label: 'Chave do quarto 7', image: '/backgrounds/scene_living_room.png', top: '65%', left: '15%', note: 'Encontrada na sala' },
    { id: 'note', type: 'note', label: 'Carta anônima', text: 'Vocês pensam que sabem a verdade. Mas a casa guarda o que vocês preferem esquecer.', top: '25%', left: '45%' },
  ];

  // Connections (Red Strings)
  const connections = [
    { from: 'clara', to: 'house' },
    { from: 'tomas', to: 'house' },
    { from: 'house', to: 'helena' },
    { from: 'key', to: 'house' },
    { from: 'note', to: 'clara' },
  ];

  return (
    <div className="layout" style={{ 
      backgroundImage: 'url(/backgrounds/corkboard_texture.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.4) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100vh', padding: '24px' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <button onClick={() => navigate('/map/blackwell')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}>
              <ArrowLeft size={20} /> Voltar
            </button>
            <span style={{ color: 'var(--accent-gold)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Investigação</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', margin: '4px 0' }}>Mural de Conexões</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Conecte pistas, descubra relações e revele a verdade.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
             <button style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px', borderRadius: '50%' }}><Filter size={18} /></button>
             <button style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px', borderRadius: '50%' }}><MoreHorizontal size={18} /></button>
          </div>
        </header>

        {/* Board Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* We would draw SVG lines here connecting the pins */}
          
          {items.map(item => (
            <div key={item.id} style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              transform: 'translate(-50%, -50%) rotate(' + (Math.random() * 10 - 5) + 'deg)',
              background: '#e8e4d9',
              padding: '8px',
              boxShadow: '2px 4px 10px rgba(0,0,0,0.5)',
              width: item.type === 'note' ? '140px' : '110px',
              cursor: 'grab'
            }}>
              {/* Pin */}
              <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#991b1b', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.5)' }} />
              
              {item.type !== 'note' && (
                <div style={{ width: '100%', height: item.type === 'location' ? '70px' : '90px', background: '#333', marginBottom: '8px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'sepia(0.3) contrast(1.1)' }} />
              )}
              {item.type === 'note' && (
                <div style={{ fontFamily: '"Kalam", cursive', fontSize: '13px', color: '#1a1a1a', padding: '8px 4px', lineHeight: 1.4 }}>
                  {item.text}
                </div>
              )}
              
              <div style={{ fontFamily: '"Kalam", cursive', fontSize: '12px', color: '#333', textAlign: 'center' }}>
                {item.label}
              </div>

              {item.note && (
                <div style={{ position: 'absolute', bottom: '-15px', right: '-20px', background: '#eab308', padding: '4px 8px', fontSize: '10px', fontFamily: '"Kalam", cursive', color: '#000', transform: 'rotate(-5deg)', boxShadow: '1px 2px 4px rgba(0,0,0,0.3)' }}>
                  {item.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom AI Panel */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <button style={{ 
            flex: 1, background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', 
            padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' 
          }}>
            <div style={{ color: 'var(--accent-gold)' }}><Brain size={32} /></div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>Análise da IA <span style={{ background: '#991b1b', padding: '2px 6px', borderRadius: '10px', fontSize: '10px', marginLeft: '8px' }}>3</span></div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Padrões detectados</div>
            </div>
          </button>
          
          <div style={{ 
            flex: 1, background: 'rgba(20,20,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', 
            padding: '16px', borderRadius: '16px' 
          }}>
            <div style={{ color: 'var(--accent-gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Conexões Feitas</div>
            <div style={{ color: '#fff', fontSize: '20px', fontWeight: 300, marginBottom: '8px' }}>{connections.length} <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>/ 12</span></div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
              <div style={{ width: `${(connections.length / 12) * 100}%`, height: '100%', background: 'var(--accent-gold)', borderRadius: '2px' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestigationBoard;
