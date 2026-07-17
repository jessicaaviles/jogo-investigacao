import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRegister } from '../services/api';
import Loading from '../components/Loading';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError('Preencha todos os campos.');
    if (password.length < 6) return setError('A senha deve ter pelo menos 6 caracteres.');
    setLoading(true);
    setError('');
    try {
      const res = await authRegister(email, password, displayName || undefined);
      if (res.success) {
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('userId', res.data.userId);
        navigate('/profile');
      } else {
        setError(res.error || 'Erro ao criar conta.');
      }
    } catch {
      setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page profile-editor-page" style={{ minHeight: '100vh', backgroundColor: '#0F1417', color: '#F8F9FA', padding: '24px 24px 96px 24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: 400, margin: '60px auto' }}>
        <span className="eyebrow">Novo investigador</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '8px 0 24px' }}>Criar Conta</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
          Vincule seu perfil a um email para acessá-lo de qualquer dispositivo.
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ color: 'var(--gold-soft)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Nome de investigador (opcional)
            <input className="input-field" type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} maxLength={32} placeholder="Como você quer ser chamado?" />
          </label>
          <label style={{ color: 'var(--gold-soft)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Email
            <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label style={{ color: 'var(--gold-soft)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Senha
            <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          </label>
          {error && <p role="alert" style={{ color: '#d79b8e', fontSize: 13 }}>{error}</p>}
          <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? <Loading small message="Criando conta..." /> : 'Criar Conta'}
          </button>
        </form>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 24, textAlign: 'center' }}>
          Já tem conta?{' '}
          <button onClick={() => navigate('/login')} style={{ color: 'var(--gold-soft)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
