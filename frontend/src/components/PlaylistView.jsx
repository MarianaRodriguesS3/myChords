function PlaylistView({ playlist, onSelectSong }) {
  if (!playlist || playlist.length === 0)
    return <p className="no-results">Nenhuma música na playlist.</p>;

  return (
    <ul>
      {playlist.map((song) => (
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

export default PlaylistView;
