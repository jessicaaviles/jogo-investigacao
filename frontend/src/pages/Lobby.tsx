import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';

const Lobby: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const [roomData, setRoomData] = useState<any>(null);

  useEffect(() => {
    if (!socket || !roomId) return;

    const userId = localStorage.getItem('userId');
    socket.emit('join_room', { roomId, userId });

    socket.on('room_state_updated', (data) => {
      setRoomData(data);
    });

    socket.on('game_started', (data) => {
      navigate(`/room/${roomId}/game`);
    });

    return () => {
      socket.off('room_state_updated');
      socket.off('game_started');
    };
  }, [socket, roomId, navigate]);

  if (!roomData) return <div style={{ padding: '24px' }}>Conectando à sala...</div>;

  const players = roomData.players || [];
  const isHost = players.some((p: any) => p.anonymous_user_id === localStorage.getItem('userId') && p.is_host);

  const handleStart = () => {
    socket?.emit('start_game', { roomId, userId: localStorage.getItem('userId') });
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ marginBottom: '32px', marginTop: '24px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Lobby</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Aguardando os investigadores.</p>
        <div style={{ marginTop: '16px', background: 'var(--bg-tertiary)', padding: '12px', borderRadius: '8px' }}>
          Código da Sala: <strong style={{ color: 'var(--text-accent)' }}>{roomData.public_code}</strong>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Equipe ({players.length}/{roomData.max_players})</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {players.map((p: any) => (
            <li key={p.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 500 }}>{p.display_name}</span>
                {p.is_host && <span style={{ marginLeft: '8px', fontSize: '12px', color: 'var(--text-accent)' }}>(Anfitrião)</span>}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {p.connection_status === 'CONNECTED' ? '🟢 Online' : '⚪ Offline'}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 'auto', marginBottom: '24px' }}>
        {isHost ? (
          <button className="btn-primary" onClick={handleStart} disabled={players.length < 2}>
            {players.length < 2 ? 'Aguardando mais jogadores...' : 'Iniciar Caso'}
            <span>→</span>
          </button>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Aguardando o anfitrião iniciar a partida...</p>
        )}
      </div>
    </div>
  );
};

export default Lobby;
