import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FolderOpen, Users, MessageCircle, UserRound, Menu, X } from 'lucide-react';

interface LayoutProps { children: React.ReactNode; }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path: string) => path === '/' ? location.pathname === '/' : path === 'map' ? location.pathname.includes('/cases') : location.pathname.includes(path);
  const navItems = [
    { label: 'INVESTIGAÇÃO', route: '/', icon: Home },
    { label: 'CASOS', route: 'map', icon: FolderOpen },
    { label: 'SALAS', route: 'lobby', icon: Users },
    { label: 'MENSAGENS', route: 'messages', icon: MessageCircle },
    { label: 'PERFIL', route: 'profile', icon: UserRound },
  ];
  const handleNav = (route: string) => {
    if (route === '/') return navigate('/');
    if (route === 'map') return navigate('/cases');
    const match = location.pathname.match(/\/room\/([^/]+)/);
    navigate(match && route !== 'cases' && route !== 'profile' ? `/room/${match[1]}/${route}` : `/${route}`);
  };

  return <div className="app-shell">
    <header className="topbar">
      {location.pathname !== '/' ? (
        <button aria-label="Ir para início" onClick={() => navigate('/')} style={{ background: 'none', border: 0 }}>
          <img className="topbar-logo" src="/logo-sem-fundo.png" alt="Último Vestígio" />
        </button>
      ) : (
        <div style={{ width: '72px' }} />
      )}
      <button className="menu-button" style={{ position: 'relative', zIndex: menuOpen ? 42 : undefined }} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <div className="menu-button-icon">
          <Menu size={19} strokeWidth={1.5} className={`menu-icon ${menuOpen ? 'menu-icon--hidden' : ''}`} />
          <X size={19} strokeWidth={1.5} className={`menu-icon menu-icon--x ${menuOpen ? 'menu-icon--visible' : ''}`} />
        </div>
        <span className="notification-dot" />
      </button>
    </header>
    {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
    <div className={`menu-drawer ${menuOpen ? 'menu-drawer--open' : ''}`}>
      <button className="menu-drawer-item" onClick={() => { setMenuOpen(false); navigate('/profile'); }}>Meu perfil</button>
      <button className="menu-drawer-item" onClick={() => { setMenuOpen(false); navigate('/messages'); }}>Mensagens</button>
      <button className="menu-drawer-item" onClick={() => { setMenuOpen(false); navigate('/tutorial'); }}>Como funciona</button>
    </div>
    <main className="app-content">{children}</main>
    <nav className="bottom-nav" aria-label="Navegação principal"><div className="bottom-nav-inner">
      {navItems.map(({ label, route, icon: Icon }) => <button className={`nav-item ${isActive(route) ? 'active' : ''}`} key={label} onClick={() => handleNav(route)}>
        <Icon size={19} strokeWidth={isActive(route) ? 1.8 : 1.4} /><span>{label}</span>
      </button>)}
    </div></nav>
  </div>;
};

export default Layout;
