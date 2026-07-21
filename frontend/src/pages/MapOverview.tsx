import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MoreHorizontal, Search, ArrowRight } from 'lucide-react';
import { useInvestigation } from '../contexts/InvestigationContext';

const MapOverview: React.FC = () => {
  const navigate = useNavigate();
  const { discoveredClues } = useInvestigation();
  const [activeTab, setActiveTab] = useState('mapa');

  // Markers
  const locations = [
    { id: 'sala-estar', label: 'Sala de Estar', pistas: `${discoveredClues.length}/5 pistas`, top: '45%', left: '25%', active: true, desc: 'Principal ponto de encontro da família. Foi aqui que Clara Mendes foi vista pela última vez.' },
    { id: 'quarto-7', label: 'Quarto 7', pistas: '3/4 pistas', top: '35%', left: '50%', active: false, desc: 'Onde o hóspede misterioso ficou.' },
    { id: 'sotao', label: 'Sótão', pistas: '1/2 pistas', top: '25%', left: '75%', active: false, desc: 'Lugar empoeirado e trancado.' },
    { id: 'biblioteca', label: 'Biblioteca', pistas: '2/3 pistas', top: '45%', left: '80%', active: false, desc: 'Repleta de livros de ocultismo.' },
    { id: 'jardim', label: 'Jardim', pistas: '1/3 pistas', top: '65%', left: '50%', active: false, desc: 'Um labirinto verde e escuro.' },
    { id: 'falesia', label: 'Falésia', pistas: '0/2 pistas', top: '75%', left: '15%', active: false, desc: 'A queda é mortal.' },
    { id: 'garagem', label: 'Garagem', pistas: '1/2 pistas', top: '75%', left: '85%', active: false, desc: 'Marcas de pneu recentes.' },
  ];

  const selectedLoc = locations[0]; // Forçando sala-estar como selecionada no protótipo

  return (
    <div style={{ backgroundColor: '#0A0D10', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden', paddingBottom: '96px' }}>
      
      {/* Background Mapa */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url(/backgrounds/map_blackwell.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        opacity: 0.6
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(180deg, #0A0D10 0%, rgba(10,13,16,0.3) 30%, rgba(10,13,16,0.5) 70%, #0A0D10 100%)', zIndex: 1
      }} />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        {/* Header Topo */}
        <header style={{ padding: '48px 24px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: '#F8F9FA', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={24} />
          </button>
          <div style={{ color: '#C5A880', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Mapa da Investigação</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8F9FA', backdropFilter: 'blur(10px)' }}>
              <Send size={18} />
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F8F9FA', backdropFilter: 'blur(10px)' }}>
              <MoreHorizontal size={20} />
            </div>
          </div>
        </header>

        {/* Título do Caso */}
        <div style={{ padding: '0 24px', marginTop: '8px' }}>
          <span style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Caso Ativo</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', margin: '8px 0', color: '#F8F9FA', fontWeight: 400, lineHeight: 1.1 }}>O Segredo de<br/>Blackwell House</h1>
          <p style={{ color: '#8E989F', fontSize: '13px', margin: '8px 0 24px 0', maxWidth: '80%', lineHeight: 1.5 }}>
            Explore os locais, encontre pistas e descubra o que realmente aconteceu.
          </p>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#8E989F', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Progresso da investigação</div>
              <div style={{ height: '4px', background: 'rgba(197, 168, 128, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: '#C5A880' }} />
              </div>
            </div>
            <div style={{ color: '#F8F9FA', fontSize: '16px', fontWeight: 600, marginLeft: '16px' }}>68%</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0 24px', gap: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginTop: '32px', WebkitOverflowScrolling: 'touch' }}>
          {['mapa', 'pistas', 'pessoas', 'linha do tempo'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ 
                background: 'none', border: 'none', padding: '0 0 16px 0', color: activeTab === tab ? '#C5A880' : '#8E989F',
                fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', whiteSpace: 'nowrap',
                borderBottom: activeTab === tab ? '2px solid #C5A880' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Mapa Área */}
        <div style={{ flex: 1, position: 'relative' }}>
          {locations.map((loc) => (
            <div key={loc.id} style={{ position: 'absolute', top: loc.top, left: loc.left, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'translate(-50%, -50%)', cursor: 'pointer' }}>
              <div style={{ background: 'rgba(10,13,16,0.85)', border: loc.active ? '1px solid #C5A880' : '1px solid rgba(197,168,128,0.3)', borderRadius: '8px', padding: '8px 12px', marginBottom: '8px', backdropFilter: 'blur(4px)' }}>
                <div style={{ color: '#F8F9FA', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>{loc.label}</div>
                <div style={{ color: '#8E989F', fontSize: '10px', whiteSpace: 'nowrap' }}>{loc.pistas}</div>
              </div>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: loc.active ? 'rgba(197,168,128,0.4)' : 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C5A880', boxShadow: loc.active ? '0 0 10px #C5A880' : 'none' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Card do Local Selecionado */}
        <div style={{ padding: '0 24px', marginTop: 'auto', marginBottom: '24px' }}>
          <div style={{ background: '#13191C', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', padding: '16px', display: 'flex', gap: '16px' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '8px', backgroundImage: 'url(/backgrounds/scene_living_room.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#C5A880', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Local em Destaque</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', margin: '4px 0', color: '#F8F9FA', fontWeight: 400 }}>{selectedLoc.label}</h3>
              <p style={{ color: '#8E989F', fontSize: '11px', margin: 0, lineHeight: 1.4 }}>{selectedLoc.desc}</p>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8E989F', fontSize: '10px' }}>
                  <Search size={12} /> {selectedLoc.pistas} encontradas
                </div>
                <button onClick={() => navigate(`/room/blackwell/scene`)} style={{ background: 'var(--olive)', border: 'none', color: '#13191C', padding: '8px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                  Explorar local <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MapOverview;
