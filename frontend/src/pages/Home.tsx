import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Shield, Award, FolderOpen, Play } from 'lucide-react';
import { registerAnonymousUser, listCases, getProfile } from '../services/api';
import Loading from '../components/Loading';

const fallbackImages: Record<string, string> = {
  'o-quarto-7': '/capa_quarto_7.png',
  'o-presente-desaparecido': '/backgrounds/cena-do-crime.png',
};

interface FeaturedCase {
  title: string;
  subtitle: string;
  level: string;
  image: string;
  description: string;
  slug: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [displayName, setDisplayName] = useState<string>('Investigador');
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [featuredCases, setFeaturedCases] = useState<FeaturedCase[]>([]);
  
  // Recuperar sala ativa do localStorage
  const activeRoomId = localStorage.getItem('currentRoomId');
  const activeRoomCode = localStorage.getItem('currentRoomCode');

  useEffect(() => {
    const token = localStorage.getItem('deviceToken');
    const userId = localStorage.getItem('userId');
    const savedName = localStorage.getItem('userName');
    
    if (savedName) {
      setDisplayName(savedName);
    }

    if (!token || !userId) {
      setRegistering(true);
      registerAnonymousUser()
        .then((res) => {
          if (res.success) {
            localStorage.setItem('deviceToken', res.data.deviceToken);
            localStorage.setItem('userId', res.data.userId);
            if (res.data.displayName) {
              setDisplayName(res.data.displayName);
              localStorage.setItem('userName', res.data.displayName);
            }
          }
        })
        .catch(() => undefined)
        .finally(() => setRegistering(false));
    } else {
      // Tenta buscar o perfil do usuário cadastrado para atualizar o nome
      getProfile(userId)
        .then((res) => {
          if (res.success && res.data?.display_name) {
            setDisplayName(res.data.display_name);
            localStorage.setItem('userName', res.data.display_name);
          }
        })
        .catch(() => undefined);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    listCases(userId)
      .then((res: any) => {
        if (res.solvedSlugs) {
          setSolvedCount(res.solvedSlugs.length);
        }
        
        if (!res.success || !res.data?.length) {
          setFeaturedCases([
            { title: 'O Quarto 7', subtitle: 'Hotel Vesper · Mistério clássico', level: 'Fácil', image: '/capa_quarto_7.png', description: 'Uma chave, uma câmera e a última noite de Helena Duarte.', slug: 'o-quarto-7' },
            { title: 'O Presente Desaparecido', subtitle: 'Arquivo · Linha do tempo', level: 'Fácil', image: '/backgrounds/cena-do-crime.png', description: 'Durante uma comemoração em família, um presente desaparece de uma mesa diante de todos.', slug: 'o-presente-desaparecido' },
          ]);
          return;
        }
        const firstTwo = res.data.slice(0, 2);
        const mapped: FeaturedCase[] = firstTwo.map((item: any, i: number) => {
          const img = item.cover_image_data || fallbackImages[item.slug] || '/backgrounds/mapa-da-investigacao.png';
          return {
            title: item.title,
            subtitle: i === 0 ? 'Hotel Vesper · Mistério clássico' : 'Arquivo · Linha do tempo',
            level: item.difficulty,
            image: img,
            description: item.short_synopsis,
            slug: item.slug,
          };
        });
        setFeaturedCases(mapped);
      })
      .catch(() => {
        setFeaturedCases([
          { title: 'O Quarto 7', subtitle: 'Hotel Vesper · Mistério clássico', level: 'Fácil', image: '/capa_quarto_7.png', description: 'Uma chave, uma câmera e a última noite de Helena Duarte.', slug: 'o-quarto-7' },
          { title: 'O Presente Desaparecido', subtitle: 'Arquivo · Linha do tempo', level: 'Fácil', image: '/backgrounds/cena-do-crime.png', description: 'Durante uma comemoração em família, um presente desaparece de uma mesa diante de todos.', slug: 'o-presente-desaparecido' },
        ]);
      });
  }, []);

  // Determinar a patente do investigador com base nos casos resolvidos
  const getInvestigatorRank = (count: number) => {
    if (count === 0) return 'Recruta';
    if (count === 1) return 'Detetive Forense';
    if (count === 2) return 'Perito Criminal';
    return 'Agente Federal';
  };

  const rank = getInvestigatorRank(solvedCount);

  return (
    <div className="home route-page" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Hero Section */}
      <section className="home-hero" style={{ minHeight: 'auto', padding: '40px 24px', borderRadius: '20px', background: 'radial-gradient(ellipse at bottom, #1B262C 0%, #0F171E 100%)', border: '1px solid rgba(255,255,255,0.03)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(rgba(197, 168, 128, 0.03) 1px, transparent 0)', backgroundSize: '24px 24px', opacity: 0.8 }}></div>
        <div className="home-hero-copy" style={{ zIndex: 2, position: 'relative', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <img className="home-hero-logo" src="/logo-sem-fundo.png" alt="Último Vestígio" style={{ maxHeight: '80px', margin: '0 auto 16px auto', display: 'block' }} />
          <span className="eyebrow" style={{ color: 'var(--gold-soft)' }}>DOSSIÊS FORENSES · TEMPORADA 01</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: 1.2, margin: '8px 0 16px 0', fontFamily: 'var(--font-serif)' }}>A verdade está nos detalhes.</h1>
          <p style={{ color: 'var(--muted)', fontSize: '15px', maxWidth: '540px', margin: '0 auto 32px auto', fontWeight: 300 }}>
            Analise evidências, interrogue suspeitos virtuais com IA e resolva crimes complexos de forma cooperativa.
          </p>
          <div className="home-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('/cases')} style={{ minHeight: '46px' }}>
              Explorar Casos <ArrowUpRight size={17} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/join')} style={{ minHeight: '46px' }}>
              Entrar com Código
            </button>
          </div>
          {registering && (
            <p className="home-registering" style={{ marginTop: '16px' }}>
              <Loading small message="Preparando seu acesso..." />
            </p>
          )}
        </div>
      </section>

      {/* Grid Principal: Dashboard do Investigador e Caso Ativo */}
      <div className="dashboard-grid">
        
        {/* Painel do Investigador */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(197,168,128,0.1)', border: '2px solid var(--gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Shield size={28} style={{ color: 'var(--gold-soft)' }} />
            </div>
            <div>
              <span className="badge-active">Painel de Acesso</span>
              <h2 style={{ fontSize: '20px', margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--paper)' }}>{displayName}</h2>
              <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Award size={14} style={{ color: 'var(--gold-soft)' }} />
                Classificação: <strong>{rank}</strong>
              </span>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-soft)', marginBottom: '12px', fontWeight: 600 }}>Estatísticas de Investigação</h3>
            <div className="stats-container">
              <div className="stat-box">
                <div className="stat-value">{solvedCount}</div>
                <div className="stat-label">Resolvidos</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">92%</div>
                <div className="stat-label">Precisão</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{solvedCount * 2 + 1}h</div>
                <div className="stat-label">Em Campo</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">01</div>
                <div className="stat-label">Temporada</div>
              </div>
            </div>
          </div>
        </div>

        {/* Caso em Andamento (Ativo) / Ajuda Rápida */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-soft)', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderOpen size={16} /> Status Atual
            </h3>
            
            {activeRoomId && activeRoomCode ? (
              <div>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.4, margin: '8px 0 16px 0' }}>
                  Você possui uma investigação ativa em grupo iniciada neste dispositivo.
                </p>
                <div className="active-case-card">
                  <div className="active-case-info">
                    <span className="badge-active">Sala Aberta</span>
                    <h4>Código: {activeRoomCode}</h4>
                    <p>Sua equipe está aguardando você.</p>
                  </div>
                  <button 
                    className="btn-primary" 
                    onClick={() => navigate(`/room/${activeRoomId}/game`)}
                    style={{ minHeight: '40px', padding: '0 16px', borderRadius: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Play size={14} fill="currentColor" /> Retomar
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, margin: '8px 0 0 0' }}>
                  Nenhuma investigação ativa no momento. Escolha um caso no arquivo municipal para começar sua perícia.
                </p>
                <button 
                  className="btn-secondary" 
                  onClick={() => navigate('/cases')}
                  style={{ width: '100%', marginTop: '24px', display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '12px' }}
                >
                  Novo Caso
                </button>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', fontSize: '11px', color: 'var(--muted)', textAlign: 'center' }}>
            Dossiê Geral do Último Vestígio · v0.9.5
          </div>
        </div>

      </div>

      {/* Casos em Destaque */}
      <section className="home-featured" style={{ marginTop: '12px' }}>
        <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div>
            <span className="eyebrow">ARQUIVO MUNICIPAL</span>
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', margin: '4px 0' }}>Casos em Destaque</h2>
          </div>
          <button className="text-link" onClick={() => navigate('/cases')} style={{ color: 'var(--gold-soft)', background: 'transparent', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
            Ver Todos <ArrowUpRight size={15} />
          </button>
        </div>
        
        <div className="case-rail" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {featuredCases.map((item, index) => (
            <article 
              className="dashboard-card" 
              key={item.title} 
              onClick={() => navigate('/cases')} 
              style={{ display: 'flex', gap: '20px', cursor: 'pointer', padding: '20px' }}
            >
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '12px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0, position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 700 }}>0{index + 1}</span>
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span className={`badge-difficulty ${item.level === 'Fácil' || item.level === 'easy' ? 'badge-easy' : item.level === 'Médio' || item.level === 'medium' ? 'badge-medium' : 'badge-hard'}`}>
                      {item.level}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.subtitle}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', margin: '0 0 6px 0', fontFamily: 'var(--font-serif)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '13px', margin: 0, fontWeight: 300, lineHeight: 1.4 }}>{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Rodapé de Frase de Efeito */}
      <section className="home-note" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', textAlign: 'center' }}>
        <span className="eyebrow">METODOLOGIA CRIMINAL</span>
        <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '16px', color: 'var(--gold-soft)', margin: '4px 0 0 0' }}>
          “A inteligência aponta os fatos. A dedução final é sempre do investigador.”
        </p>
      </section>
      
    </div>
  );
};

export default Home;
