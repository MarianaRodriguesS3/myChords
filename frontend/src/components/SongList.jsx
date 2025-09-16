function SongList({ songs, onClick, icon = "🎵" }) {
  if (!songs || songs.length === 0) {
    return <p>Sem músicas para exibir.</p>;
  }

  return (
    <ul>
      {songs.map((song) => (
        <li
          key={song.id}
          className={`song-list-item ${onClick ? "clickable" : ""}`}
          onClick={() => onClick?.(song)}
        >
          {icon} {song.title}
        </li>
      ))}
    </ul>
  );
}

export default SongList;
