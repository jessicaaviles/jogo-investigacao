import React, { useState } from 'react';
import { Flashlight, Eye } from 'lucide-react';
import { useInvestigation } from '../contexts/InvestigationContext';

const SceneExplorer: React.FC = () => {
  
  const [uvLight, setUvLight] = useState(false);
  const { discoveredClues, addClue } = useInvestigation();
  const [showHint, setShowHint] = useState(true);

  const hotspots = [
    { id: 'window', label: 'Janela Entreaberta', top: '30%', left: '30%', isFound: discoveredClues.includes('window') },
    { id: 'armchair', label: 'Poltrona Revirada', top: '55%', left: '35%', isFound: discoveredClues.includes('armchair') },
    { id: 'table', label: 'Anotações Rasgadas', top: '70%', left: '55%', isFound: discoveredClues.includes('table') },
    { id: 'fireplace', label: 'Lareira Apagada', top: '50%', left: '80%', isFound: discoveredClues.includes('fireplace') },
    { id: 'blood', label: 'Mancha de Sangue', top: '80%', left: '75%', isFound: discoveredClues.includes('blood'), requiresUv: true },
  ];

  const handleHotspotClick = (id: string, requiresUv?: boolean) => {
    if (requiresUv && !uvLight) return;
    if (!discoveredClues.includes(id)) {
      addClue(id);
    }
  };

  return (
    <div className="layout" style={{ 
      backgroundImage: uvLight ? 'url(/backgrounds/scene_living_room.png)' : 'url(/backgrounds/scene_living_room.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative',
      filter: uvLight ? 'contrast(1.2) hue-rotate(240deg) saturate(1.5) brightness(0.6)' : 'none',
      transition: 'all 0.5s ease'
    }}>
      {/* Overlay gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.9) 100%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100vh', paddingTop: '80px' }}>
        
        {/* Header */}
        <header style={{ padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Cena do Crime</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', margin: '4px 0', color: '#F8F9FA', fontWeight: 400 }}>Sala de Estar</h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>Explore a cena. Cada detalhe pode ser uma pista.</p>
            
            <div style={{ marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
               <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Pistas Encontradas</span>
               <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{discoveredClues.length} / {hotspots.length}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setUvLight(!uvLight)}
                style={{ background: uvLight ? 'var(--accent-gold)' : 'rgba(0,0,0,0.6)', color: uvLight ? '#000' : '#fff', border: '1px solid ' + (uvLight ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)'), padding: '12px', borderRadius: '50%', cursor: 'pointer', transition: 'all 0.3s ease' }}
              >
                <Flashlight size={20} />
              </button>
            </div>
            
            {/* Mini Map */}
            <div style={{ width: '120px', height: '120px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px', position: 'relative' }}>
               <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>Térreo</div>
               {/* Simplified floor plan drawing */}
               <div style={{ width: '100%', height: '70%', border: '1px solid rgba(255,255,255,0.2)', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '40%', left: '30%', width: '30%', height: '30%', background: 'rgba(212,175,55,0.3)', border: '1px solid var(--accent-gold)' }}>
                   <div style={{ width: '4px', height: '4px', background: 'var(--accent-gold)', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                 </div>
               </div>
            </div>
          </div>
        </header>

        {/* Hotspots */}
        <div style={{ flex: 1, position: 'relative' }}>
          {hotspots.map(hotspot => {
            if (hotspot.requiresUv && !uvLight) return null;

            return (
              <div 
                key={hotspot.id} 
                onClick={() => handleHotspotClick(hotspot.id, hotspot.requiresUv)}
                style={{ 
                  position: 'absolute', 
                  top: hotspot.top, 
                  left: hotspot.left,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: hotspot.isFound ? (hotspot.requiresUv ? '#eab308' : 'var(--accent-gold)') : 'transparent', 
                  border: `2px solid ${hotspot.requiresUv ? '#eab308' : 'var(--accent-gold)'}`,
                  boxShadow: hotspot.isFound ? `0 0 15px ${hotspot.requiresUv ? '#eab308' : 'var(--accent-gold)'}` : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}>
                  {hotspot.isFound && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
                </div>
                
                <div style={{ 
                  background: 'rgba(0,0,0,0.7)', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  color: '#fff', 
                  fontSize: '11px',
                  opacity: hotspot.isFound ? 1 : 0.5,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                  border: `1px solid ${hotspot.requiresUv ? '#eab308' : 'rgba(255,255,255,0.1)'}`
                }}>
                  {hotspot.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Panel */}
        <div style={{ padding: '24px', pointerEvents: 'auto' }}>
          
          {/* AI Tip */}
          {showHint && (
            <div style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', maxWidth: '400px' }}>
              <div style={{ background: 'rgba(212,175,55,0.1)', padding: '12px', borderRadius: '50%', color: 'var(--accent-gold)' }}>
                <Eye size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'var(--accent-gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Dica da IA</div>
                <div style={{ color: '#fff', fontSize: '13px', lineHeight: 1.4 }}>A posição do copo e a mancha de sangue sugerem que houve uma discussão antes do crime.</div>
              </div>
              <button onClick={() => setShowHint(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '24px', lineHeight: 1 }}>×</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SceneExplorer;
