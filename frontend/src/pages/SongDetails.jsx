import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SongContent from "./SongContent"; // Correto: mesma pasta
import AddToPlaylistButton from "./AddToPlaylistButton"; // Correto: mesma pasta

function SongDetails() {
  const { id } = useParams();
  const [songInfo, setSongInfo] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const songsList = [
      { id: "tempo-perdido", title: "Tempo Perdido", artist: "Legião Urbana" },
      { id: "pais-e-filhos", title: "Pais e Filhos", artist: "Legião Urbana" },
      { id: "eduardo-e-monica", title: "Eduardo e Mônica", artist: "Legião Urbana" },
      { id: "indios", title: "Índios", artist: "Legião Urbana" },
      { id: "sera", title: "Será", artist: "Legião Urbana" },
      { id: "quase-sem-querer", title: "Quase Sem Querer", artist: "Legião Urbana" },
      { id: "ainda-e-cedo", title: "Ainda é Cedo", artist: "Legião Urbana" },
      { id: "ha-tempos", title: "Há Tempos", artist: "Legião Urbana" },
      { id: "monte-castelo", title: "Monte Castelo", artist: "Legião Urbana" },
      { id: "por-enquanto", title: "Por Enquanto", artist: "Legião Urbana" },
    ];

    const song = songsList.find((s) => s.id === id);

    if (song) {
      setSongInfo(song);

      fetch(`http://localhost:3001/api/songs/${id}/content`)
        .then((res) => {
          if (!res.ok) throw new Error("Essa música ainda não está disponível");
          return res.text();
        })
        .then((text) => {
          try {
            const maybeJson = JSON.parse(text);
            if (maybeJson.content) {
              setContent(maybeJson.content);
            } else {
              setContent(text);
            }
          } catch {
            setContent(text);
          }
        })
        .catch((err) => setError(err.message));
    } else {
      setError("Música não encontrada");
    }
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
