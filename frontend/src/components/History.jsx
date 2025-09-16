function History({ history, onSelectSong }) {
  if (!history || history.length === 0)
    return <p className="no-results">Nenhum histórico ainda.</p>;

  return (
    <ul>
      {history.map((song) => (
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

export default History;
