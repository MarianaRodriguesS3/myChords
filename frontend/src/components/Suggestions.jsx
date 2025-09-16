function Suggestions({ songs, onSelectSong }) {
  if (!songs || songs.length === 0)
    return <p className="no-results">Nenhuma sugestão.</p>;

  return (
    <ul>
      {songs.slice(0, 10).map((song) => (
        <li
          key={song.id}
          className="clickable-item"
          onClick={() => onSelectSong(song)}
        >
          {song.title}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
