function SongContent({ content }) {
  const chordRegex = /^[A-G](#|b)?(m|min|maj|dim|aug|sus|add|7M|º)?\d*(\([^)]+\))?(\/[A-G](#|b)?)?$/;

  const isChord = (word) => chordRegex.test(word.trim());

  const isLikelyChordLine = (line) => {
    const words = line.trim().split(/\s+/);
    const chordCount = words.filter((w) => isChord(w)).length;
    return chordCount >= 2 || chordCount / words.length >= 0.6;
  };

  const lines = content.split("\n");

  return (
    <div className="song-viewer">
      {lines.map((line, i) => {
        if (line.trim() === "") {
          return (
            <div key={i} className="song-line">
              &nbsp;
            </div>
          );
        }

        const isChordLine = isLikelyChordLine(line);
        const words = line.split(/(\s+)/); // mantém espaços

        return (
          <div key={i} className="song-line">
            {words.map((word, idx) => {
              const trimmed = word.trim();
              const isBracketed = /^\[.*\]$/.test(trimmed);
              const isLabel = /^[A-Za-z]+:$/.test(trimmed);
              const isShortChord = /^[A-G]$/.test(trimmed);
              const prev = idx >= 2 ? words[idx - 2].trim() : "";

              if (isLabel) {
                return (
                  <span key={idx} className="lyric">
                    {word}
                  </span>
                );
              }

              if (prev && /^[A-Za-z]+:$/.test(prev) && isChord(trimmed)) {
                return (
                  <span key={idx} className="chord">
                    {word}
                  </span>
                );
              }

              const isValidChord =
                isChord(trimmed) && !isBracketed && (!isShortChord || isChordLine);

              return (
                <span key={idx} className={isValidChord ? "chord" : "lyric"}>
                  {word}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default SongContent;
