import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin } from '../services/api';
import Loading from '../components/Loading';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError('Preencha todos os campos.');
    setLoading(true);
    setError('');
    try {
      const res = await authLogin(email, password);
      if (res.success) {
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('userId', res.data.userId);
        navigate('/profile');
      } else {
        setError(res.error || 'Erro ao fazer login.');
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
        <span className="eyebrow">Acesso</span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '32px', fontWeight: 400, margin: '8px 0 24px' }}>Entrar</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ color: 'var(--gold-soft)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Email
            <input className="input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </label>
          <label style={{ color: 'var(--gold-soft)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Senha
            <input className="input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </label>
          {error && <p role="alert" style={{ color: '#d79b8e', fontSize: 13 }}>{error}</p>}
          <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? <Loading small message="Entrando..." /> : 'Entrar'}
          </button>
        </form>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 24, textAlign: 'center' }}>
          Ainda não tem conta?{' '}
          <button onClick={() => navigate('/register')} style={{ color: 'var(--gold-soft)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Criar conta
          </button>
        </p>
        <p style={{ textAlign: 'center', marginTop: 8 }}>
          <button onClick={() => navigate('/profile')} style={{ color: 'var(--muted)', background: 'none', border: 'none', fontSize: 12, cursor: 'pointer', textDecoration: 'underline' }}>
            Continuar como anônimo
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
