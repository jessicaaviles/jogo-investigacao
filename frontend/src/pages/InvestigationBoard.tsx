import React from 'react';

import { Brain, Filter, MoreHorizontal } from 'lucide-react';

const InvestigationBoard: React.FC = () => {
  

  // Mock data for board items
  const items = [
    { id: 'helena', type: 'person', label: 'Helena', image: '/images/portraits/default_f.png', top: '55%', left: '30%', note: 'Amiga próxima' },
    { id: 'clara', type: 'person', label: 'Clara Mendes', image: '/images/portraits/default_f.png', top: '25%', left: '25%', note: 'Desaparecida 12/05' },
    { id: 'tomas', type: 'person', label: 'Sr. Tomás Blackwell', image: '/images/portraits/default_m.png', top: '35%', left: '75%', note: '?' },
    { id: 'house', type: 'location', label: 'Blackwell House', image: '/backgrounds/map_blackwell.png', top: '45%', left: '50%' },
    { id: 'key', type: 'item', label: 'Chave do quarto 7', image: '/backgrounds/scene_living_room.png', top: '75%', left: '60%', note: 'Encontrada na sala' },
    { id: 'note', type: 'note', label: 'Carta anônima', text: 'Vocês pensam que sabem a verdade. Mas a casa guarda o que vocês preferem esquecer.', top: '15%', left: '55%' },
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
      {/* Overlay Escuro para escurecer a cortiça */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100vh', padding: '80px 24px 96px 24px' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', backgroundColor: 'rgba(19, 25, 28, 0.85)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <span style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Investigação</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', margin: '4px 0', color: '#F8F9FA', fontWeight: 400 }}>Mural de Conexões</h1>
            <p style={{ color: '#8E989F', fontSize: '13px', margin: 0 }}>Conecte pistas e revele a verdade.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
             <button style={{ backgroundColor: '#13191C', border: '1px solid rgba(255,255,255,0.1)', color: '#F8F9FA', padding: '8px', borderRadius: '50%' }}><Filter size={14} /></button>
             <button style={{ backgroundColor: '#13191C', border: '1px solid rgba(255,255,255,0.1)', color: '#F8F9FA', padding: '8px', borderRadius: '50%' }}><MoreHorizontal size={14} /></button>
          </div>
        </header>

        {/* Board Area */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* We would draw SVG lines here connecting the pins */}
          
          <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 2 }}>
            {items.map(item => (
              <div key={item.id} style={{
                position: 'absolute',
                top: item.top,
                left: item.left,
                transform: 'translate(-50%, -50%) rotate(' + (Math.random() * 8 - 4) + 'deg)',
                backgroundColor: 'var(--paper)',
                padding: '6px',
                boxShadow: '2px 4px 10px rgba(0,0,0,0.5)',
                width: item.type === 'note' ? '120px' : '85px',
                cursor: 'grab'
              }}>
                {/* Pin */}
                <div style={{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#991b1b', boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.5)' }} />
                
                {item.type !== 'note' && (
                  <div style={{ width: '100%', height: item.type === 'location' ? '50px' : '70px', backgroundColor: '#333', marginBottom: '6px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'sepia(0.3) contrast(1.1)' }} />
                )}
                {item.type === 'note' && (
                  <div style={{ fontFamily: '"Kalam", cursive', fontSize: '11px', color: '#1a1a1a', padding: '6px 2px', lineHeight: 1.4 }}>
                    {item.text}
                  </div>
                )}
                
                <div style={{ fontFamily: '"Kalam", cursive', fontSize: '10px', color: '#333', textAlign: 'center' }}>
                  {item.label}
                </div>

                {item.note && (
                  <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', backgroundColor: '#eab308', padding: '2px 6px', fontSize: '8px', fontFamily: '"Kalam", cursive', color: '#000', transform: 'rotate(-5deg)', boxShadow: '1px 2px 4px rgba(0,0,0,0.3)', zIndex: 3, whiteSpace: 'nowrap' }}>
                    {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom AI Panel */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', backgroundColor: 'rgba(19, 25, 28, 0.85)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button style={{ 
            flex: 1, backgroundColor: '#13191C', border: '1px solid rgba(197, 168, 128, 0.2)', 
            padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' 
          }}>
            <div style={{ color: '#C5A880' }}><Brain size={32} /></div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#F8F9FA', fontSize: '14px', fontWeight: 600 }}>Análise da IA <span style={{ backgroundColor: '#991b1b', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontSize: '10px', marginLeft: '8px' }}>3</span></div>
              <div style={{ color: '#8E989F', fontSize: '12px' }}>Padrões detectados</div>
            </div>
          </button>
          
          <div style={{ 
            flex: 1, backgroundColor: '#13191C', border: '1px solid rgba(255,255,255,0.05)', 
            padding: '16px', borderRadius: '16px' 
          }}>
            <div style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Conexões Feitas</div>
            <div style={{ color: '#F8F9FA', fontSize: '20px', fontWeight: 300, marginBottom: '8px' }}>{connections.length} <span style={{ fontSize: '14px', color: '#8E989F' }}>/ 12</span></div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
              <div style={{ width: `${(connections.length / 12) * 100}%`, height: '100%', backgroundColor: '#C5A880', borderRadius: '2px' }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InvestigationBoard;
