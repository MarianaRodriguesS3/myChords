import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Suggestions from "../components/Suggestions";
import History from "../components/History";

function Home() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/songs")
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Erro ao buscar músicas:", err));
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSong = (song) => {
    // Atualiza o histórico
    setHistory((prev) => {
      const updated = [song, ...prev.filter((s) => s.id !== song.id)];
      const limited = updated.slice(0, 10);
      localStorage.setItem("history", JSON.stringify(limited));
      return limited;
    });

    // Redireciona para a página de detalhes da música
    navigate(`/song/${song.id}`);
  };

  return (
    <div className="conteudo-centralizado">
      <h1>Pesquise suas músicas favoritas</h1>

      <input
        type="text"
        placeholder="Buscar música..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="sugestoes-historico-layout">
        <div className="sugestoes-coluna">
          <h2>Sugestões</h2>
          <Suggestions songs={filteredSongs} onSelectSong={handleSelectSong} />
        </div>

        <div className="historico-coluna">
          <h2>Histórico</h2>
          <History history={history} onSelectSong={handleSelectSong} />
        </div>
      </div>
    </div>
  );
}

export default Home;
