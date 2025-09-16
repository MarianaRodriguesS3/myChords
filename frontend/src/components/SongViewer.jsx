function SongViewer({ content }) {
  if (!content) return null;

  return (
    <pre className="song-viewer">
      {content}
    </pre>
  );
}

export default SongViewer;
