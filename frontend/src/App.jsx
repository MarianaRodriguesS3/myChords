import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import SongDetails from "./pages/SongDetails";

function App() {
  return (
    <div>
      <nav className="conteudo-centralizado">
        <Link to="/">Home</Link> <span>|</span> <Link to="/playlist">Minha Playlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/song/:id" element={<SongDetails />} />
      </Routes>
    </div>
  );
}

export default App;
