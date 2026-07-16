import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RoomEntry: React.FC = () => { const { roomCode } = useParams(); const navigate = useNavigate(); useEffect(() => { navigate(`/join?room=${encodeURIComponent(roomCode || '')}`, { replace: true }); }, [navigate, roomCode]); return <div className="game-empty"><span className="eyebrow">Convite recebido</span><h1>Abrindo a investigação...</h1></div>; };
export default RoomEntry;
