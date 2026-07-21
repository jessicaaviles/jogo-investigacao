import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, FileText, Image as ImageIcon, Key } from 'lucide-react';

const CaseFiles: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const evidences = [
    { id: '1', type: 'document', title: 'Carta Anônima', desc: 'Encontrada sob a porta.', date: '12/05', icon: <FileText size={20} /> },
    { id: '2', type: 'item', title: 'Chave do Quarto 7', desc: 'Estava na sala de estar.', date: '13/05', icon: <Key size={20} /> },
    { id: '3', type: 'photo', title: 'Foto da Família', desc: 'Retrato antigo rasgado.', date: '13/05', icon: <ImageIcon size={20} /> },
    { id: '4', type: 'document', title: 'Diário de Elisa', desc: 'Última anotação suspeita.', date: '11/05', icon: <FileText size={20} /> },
  ];

  const filtered = filter === 'all' ? evidences : evidences.filter(e => e.type === filter);

  return (
    <div className="layout" style={{ 
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '24px' }}>
          <button onClick={() => navigate('/map/blackwell')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', padding: 0 }}>
            <ArrowLeft size={20} /> Voltar
          </button>
          <span style={{ color: 'var(--accent-gold)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>Inventário</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', margin: '4px 0', color: '#fff' }}>Arquivos do Caso</h1>
        </header>

        {/* Search & Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Search size={18} color="rgba(255,255,255,0.5)" />
            <input type="text" placeholder="Buscar evidências..." style={{ background: 'none', border: 'none', color: '#fff', width: '100%', outline: 'none', fontSize: '14px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '12px' }}>
          <button onClick={() => setFilter('all')} style={{ background: filter === 'all' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)', color: filter === 'all' ? '#000' : '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Todos</button>
          <button onClick={() => setFilter('document')} style={{ background: filter === 'document' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)', color: filter === 'document' ? '#000' : '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Documentos</button>
          <button onClick={() => setFilter('item')} style={{ background: filter === 'item' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)', color: filter === 'item' ? '#000' : '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Objetos</button>
          <button onClick={() => setFilter('photo')} style={{ background: filter === 'photo' ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)', color: filter === 'photo' ? '#000' : '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Fotos</button>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignContent: 'start', overflowY: 'auto' }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px', cursor: 'pointer' }} onClick={() => navigate(`/evidence/${item.id}`)}>
              <div style={{ background: 'rgba(212,175,55,0.1)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', marginBottom: '12px' }}>
                {item.icon}
              </div>
              <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', lineHeight: 1.4, marginBottom: '12px' }}>{item.desc}</div>
              <div style={{ color: 'var(--accent-gold)', fontSize: '10px', fontWeight: 600 }}>{item.date}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CaseFiles;
