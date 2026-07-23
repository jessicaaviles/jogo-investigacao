import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useSocket } from './useSocket';

interface InvestigationContextData {
  activeCaseId: string | null;
  discoveredClues: string[]; // array of Evidence IDs
  addClue: (clueId: string) => void;
  hasClue: (clueId: string) => boolean;
}

const InvestigationContext = createContext<InvestigationContextData | undefined>(undefined);

export const InvestigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCaseId] = useState<string | null>('blackwell');
  
  const [discoveredClues, setDiscoveredClues] = useState<string[]>(() => {
    const saved = localStorage.getItem('jogo_investigacao_clues');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('jogo_investigacao_clues', JSON.stringify(discoveredClues));
  }, [discoveredClues]);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleClueDiscovered = (data: { clueId: string; finderName: string }) => {
      setDiscoveredClues((prev) => {
        if (prev.includes(data.clueId)) return prev;
        return [...prev, data.clueId];
      });
      
      const event = new CustomEvent('clue_discovered_notification', { 
        detail: { clueId: data.clueId, finderName: data.finderName } 
      });
      window.dispatchEvent(event);
    };

    socket.on('clue_discovered_alert', handleClueDiscovered);

    return () => {
      socket.off('clue_discovered_alert', handleClueDiscovered);
    };
  }, [socket]);

  const addClue = (clueId: string) => {
    setDiscoveredClues((prev) => {
      if (prev.includes(clueId)) return prev;
      
      // Emitir via socket se estivermos em uma sala cooperativa
      const roomId = localStorage.getItem('currentRoomId');
      if (socket && roomId) {
        const userName = localStorage.getItem('userName') || 'Investigador';
        socket.emit('broadcast_to_room', {
          roomId,
          event: 'clue_discovered_alert',
          data: { clueId, finderName: userName }
        });
      }

      return [...prev, clueId];
    });
  };

  const hasClue = (clueId: string) => {
    return discoveredClues.includes(clueId);
  };

  return (
    <InvestigationContext.Provider value={{ activeCaseId, discoveredClues, addClue, hasClue }}>
      {children}
    </InvestigationContext.Provider>
  );
};

export const useInvestigation = () => {
  const context = useContext(InvestigationContext);
  if (context === undefined) {
    throw new Error('useInvestigation must be used within an InvestigationProvider');
  }
  return context;
};
