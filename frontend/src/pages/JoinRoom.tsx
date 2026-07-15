import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinRoom } from '../services/api';

const JoinRoom: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const userId = localStorage.getItem('userId');
    if (!userId || !name || !code) {
      alert("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const res = await joinRoom(code.toUpperCase(), userId, name);
      if (res.success) {
        navigate(`/room/${res.data.roomId}/lobby`);
      } else {
        alert(res.error || "Falha ao entrar");
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
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Entrar na Investigação</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Insira o código fornecido pelo anfitrião.</p>
      </div>

      <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Código da Sala</label>
          <input 
            className="input-field" 
            placeholder="Ex: AB123C" 
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={6}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Seu Nome de Investigador</label>
          <input 
            className="input-field" 
            placeholder="Como devemos chamá-lo?" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 'auto', marginBottom: '24px' }}>
          <button type="submit" className="btn-primary" disabled={loading || !code || !name}>
            {loading ? 'Entrando...' : 'Confirmar'}
            <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoom;
