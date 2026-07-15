import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './contexts/SocketContext';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/join" element={<JoinRoom />} />
            <Route path="/room/:roomId/lobby" element={<Lobby />} />
            <Route path="/room/:roomId/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SocketProvider>
  );
}

export default App;
