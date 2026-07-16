import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { submitFeedback } from '../services/api';

const Feedback: React.FC = () => {
  const { roomId } = useParams(); const navigate = useNavigate();
  const [rating, setRating] = useState(0); const [fair, setFair] = useState(true); const [playAnother, setPlayAnother] = useState(true); const [sent, setSent] = useState(false); const [error, setError] = useState('');
  const send = async (event: React.FormEvent) => {
    event.preventDefault(); if (!roomId || !rating) return setError('Escolha uma nota para continuar.');
    const response = await submitFeedback({ roomId, userId: localStorage.getItem('userId') || '', rating, fairSolution: fair, masterError: false, confusion: false, playAnother, recommendationScore: rating });
    if (response.success) setSent(true); else setError(response.error || 'Não foi possível registrar o feedback.');
  };
  if (sent) return <div className="feedback-page"><span className="eyebrow">Registro concluído</span><h1>Obrigado por investigar.</h1><p>Seu feedback ajuda a calibrar os próximos casos.</p><button className="btn-primary" onClick={() => navigate('/')}>Voltar ao arquivo</button></div>;
  return <div className="feedback-page"><span className="eyebrow">Depois da investigação</span><h1>Como foi a experiência?</h1><p>Uma resposta rápida. Nenhuma informação pessoal é armazenada.</p><form onSubmit={send} className="feedback-form"><fieldset><legend>Nota geral</legend><div className="rating-row">{[1,2,3,4,5].map(value => <button type="button" aria-label={`${value} estrelas`} className={rating >= value ? 'selected' : ''} onClick={() => setRating(value)} key={value}>★</button>)}</div></fieldset><label className="check-row"><input type="checkbox" checked={fair} onChange={event => setFair(event.target.checked)} /> A solução pareceu justa</label><label className="check-row"><input type="checkbox" checked={playAnother} onChange={event => setPlayAnother(event.target.checked)} /> Eu jogaria outro caso</label>{error && <p role="alert" className="form-error">{error}</p>}<button className="btn-primary" type="submit">Enviar feedback</button></form></div>;
};
export default Feedback;
