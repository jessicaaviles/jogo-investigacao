import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../services/api';

const CreateRoom: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Erro de identificação. Retorne à home.");
      return;
    }

    try {
      const res = await createRoom(userId);
      if (res.success) {
        navigate(`/room/${res.data.roomId}/lobby`);
      } else {
        alert("Falha ao criar sala");
      }
    } catch (e) {
      console.error(e);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ marginBottom: '32px', marginTop: '24px' }}>
        <button onClick={() => navigate(-1)} style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>← Voltar</button>
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Configurar Partida</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Um novo caso o aguarda. Prepare sua equipe.</p>
      </div>

      <div className="card" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>O Presente Desaparecido</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
          Um caso rápido recomendado para iniciantes. A festa estava pronta, mas o item principal sumiu do cofre fechado.
        </p>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-accent)' }}>
          <span>2-6 Jogadores</span>
          <span>•</span>
          <span>~30 min</span>
        </div>
      </div>

      <div style={{ marginTop: 'auto', marginBottom: '24px' }}>
        <button className="btn-primary" onClick={handleCreate} disabled={loading}>
          {loading ? 'Criando...' : 'Criar Sala'}
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
