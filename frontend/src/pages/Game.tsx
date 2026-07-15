import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../contexts/SocketContext';

const Game: React.FC = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const [question, setQuestion] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('question_processed', (data) => {
      setLoading(false);
      setHistory(prev => [...prev, data]);
      setQuestion('');
    });

    socket.on('turn_passed', (data) => {
      // TODO Handle turn logic
    });

    socket.on('error', (err) => {
      setLoading(false);
      alert(err);
    });

    return () => {
      socket.off('question_processed');
      socket.off('turn_passed');
      socket.off('error');
    };
  }, [socket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    socket?.emit('submit_question', {
      roomId,
      userId: localStorage.getItem('userId'),
      questionText: question
    });
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ marginBottom: '24px', marginTop: '16px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '4px', fontFamily: 'var(--font-serif)' }}>
          O Presente Desaparecido
        </h2>
        <div style={{ fontSize: '14px', color: 'var(--text-accent)' }}>Rodada 1</div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Fatos do Caso</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          A festa estava pronta, mas o item principal sumiu do cofre fechado.
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
        {history.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: 'auto' }}>
            Nenhuma pergunta feita ainda.
          </p>
        ) : (
          history.map((item, idx) => (
            <div key={idx} className="card" style={{ borderLeft: '3px solid var(--text-accent)' }}>
              <div style={{ fontWeight: 500, marginBottom: '8px' }}>{item.question.original_text}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Mestre IA:</strong> {item.answer.rendered_text}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 'auto', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            className="input-field" 
            placeholder="Faça uma pergunta ao Mestre..." 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            style={{ 
              backgroundColor: 'var(--accent-color)', 
              color: '#fff', 
              padding: '0 24px', 
              borderRadius: '8px',
              fontWeight: 500
            }}
            disabled={loading || !question.trim()}
          >
            {loading ? '...' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Game;
