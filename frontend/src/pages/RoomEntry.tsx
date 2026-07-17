import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const RoomEntry: React.FC = () => { const { roomCode } = useParams(); const navigate = useNavigate(); useEffect(() => { navigate(`/join?room=${encodeURIComponent(roomCode || '')}`, { replace: true }); }, [navigate, roomCode]); return <Loading message="Abrindo a investigação..." />; };
export default RoomEntry;
