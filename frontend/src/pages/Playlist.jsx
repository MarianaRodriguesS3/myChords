import { useState, useEffect } from "react";
import PlaylistView from "../components/PlaylistView";
import { useNavigate } from "react-router-dom";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("playlist");
    setPlaylist(saved ? JSON.parse(saved) : []);
  }, []);

  const handleSelectSong = (song) => {
    navigate(`/song/${song.id}`);
  };

  return (
    <div className="conteudo-centralizado">
      <h1>Minha Playlist</h1>
      <PlaylistView playlist={playlist} onSelectSong={handleSelectSong} />
    </div>
  );
}

export default Playlist;
