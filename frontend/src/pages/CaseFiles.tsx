import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Image as ImageIcon, Key, Droplet } from 'lucide-react';
import { useInvestigation } from '../contexts/InvestigationContext';

const CaseFiles: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const { discoveredClues } = useInvestigation();

  const allEvidences = [
    { id: 'fireplace', type: 'document', title: 'Carta Anônima', desc: 'Encontrada sob a lareira apagada.', date: '12/05', icon: <FileText size={20} /> },
    { id: 'armchair', type: 'item', title: 'Chave do Quarto 7', desc: 'Estava escondida na poltrona revirada.', date: '13/05', icon: <Key size={20} /> },
    { id: 'window', type: 'photo', title: 'Foto da Família', desc: 'Retrato antigo perto da janela.', date: '13/05', icon: <ImageIcon size={20} /> },
    { id: 'table', type: 'document', title: 'Diário de Elisa', desc: 'Última anotação fala sobre "o homem de chapéu".', date: '14/05', icon: <FileText size={20} /> },
    { id: 'blood', type: 'item', title: 'Mancha de Sangue', desc: 'Detectada com luz UV perto da parede.', date: '15/05', icon: <Droplet size={20} /> },
    { id: '6', type: 'document', title: 'Recibo do Banco', desc: 'Transferência de alto valor para conta desconhecida.', date: '15/05', icon: <FileText size={20} /> },
  ];

  // Apenas as pistas que o usuário clicou e descobriu
  const availableEvidences = allEvidences.filter(e => discoveredClues.includes(e.id));
  const filtered = filter === 'all' ? availableEvidences : availableEvidences.filter(e => e.type === filter);

  return (
    <div className="layout" style={{ 
      backgroundColor: '#0F1417',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{ padding: '80px 24px 96px 24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '24px' }}>
          <span style={{ color: '#C5A880', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Inventário</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', margin: '4px 0', color: '#F8F9FA', fontWeight: 400 }}>Arquivos do Caso</h1>
        </header>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, backgroundColor: '#13191C', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Search size={18} color="#8E989F" />
            <input type="text" placeholder="Buscar evidências..." style={{ background: 'none', border: 'none', color: '#F8F9FA', width: '100%', outline: 'none', fontSize: '14px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px' }}>
          <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? 'var(--olive)' : 'rgba(255,255,255,0.05)', color: filter === 'all' ? 'var(--paper)' : '#F8F9FA', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Todos</button>
          <button onClick={() => setFilter('document')} style={{ background: filter === 'document' ? 'var(--olive)' : 'rgba(255,255,255,0.05)', color: filter === 'document' ? 'var(--paper)' : '#F8F9FA', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Documentos</button>
          <button onClick={() => setFilter('item')} style={{ background: filter === 'item' ? 'var(--olive)' : 'rgba(255,255,255,0.05)', color: filter === 'item' ? 'var(--paper)' : '#F8F9FA', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Objetos</button>
          <button onClick={() => setFilter('photo')} style={{ background: filter === 'photo' ? 'var(--olive)' : 'rgba(255,255,255,0.05)', color: filter === 'photo' ? 'var(--paper)' : '#F8F9FA', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Fotos</button>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignContent: 'start', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '40px', color: '#8E989F', fontSize: '13px' }}>
              Nenhuma evidência encontrada ainda.<br/>Explore os locais no mapa.
            </div>
          ) : (
            filtered.map(item => (
              <div key={item.id} style={{ backgroundColor: '#13191C', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', cursor: 'pointer' }} onClick={() => navigate(`/evidence/${item.id}`)}>
                <div style={{ backgroundColor: 'rgba(197,168,128,0.1)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A880', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <div style={{ color: '#F8F9FA', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</div>
                <div style={{ color: '#8E989F', fontSize: '11px', lineHeight: 1.4, marginBottom: '12px' }}>{item.desc}</div>
                <div style={{ color: '#C5A880', fontSize: '10px', fontWeight: 600 }}>{item.date}</div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default CaseFiles;
