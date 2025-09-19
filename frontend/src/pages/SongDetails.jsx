import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SongContent from "./SongContent"; 
import AddToPlaylistButton from "./AddToPlaylistButton";

function SongDetails() {
  const { id } = useParams();
  const [songInfo, setSongInfo] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // URL base da API (do .env)
    const API_BASE = import.meta.env.VITE_API_URL;

    // 1. Busca a lista de músicas
    fetch(`${API_BASE}/api/songs`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar músicas");
        return res.json();
      })
      .then((data) => {
        const song = data.find((s) => s.id === id);
        if (!song) throw new Error("Música não encontrada");
        setSongInfo(song);

        // 2. Busca o conteúdo da música
        return fetch(`${API_BASE}/api/songs/${id}/content`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Essa música ainda não está disponível");
        return res.text();
      })
      .then((text) => {
        try {
          const maybeJson = JSON.parse(text);
          setContent(maybeJson.content || text);
        } catch {
          setContent(text);
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  const handleAddToPlaylist = (song) => {
    const saved = localStorage.getItem("playlist");
    const prev = saved ? JSON.parse(saved) : [];
    const updated = [song, ...prev.filter((s) => s.id !== song.id)];
    const limited = updated.slice(0, 50);
    localStorage.setItem("playlist", JSON.stringify(limited));
  };

  if (error) {
    return (
      <div className="conteudo-centralizado">
        <h2>Erro</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!songInfo) {
    return (
      <div className="conteudo-centralizado">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="conteudo-centralizado">
      <h1>{songInfo.title}</h1>
      <h3>{songInfo.artist}</h3>

      <AddToPlaylistButton onAdd={() => handleAddToPlaylist(songInfo)} />

      <SongContent content={content} />
    </div>
  );
}

export default SongDetails;
