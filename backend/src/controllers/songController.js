const path = require("path");
const fs = require("fs");
const songs = require("../../data/songs");

exports.getAllSongs = (req, res) => {
  res.json(songs);
};

exports.getSongContent = (req, res) => {
  const { id } = req.params;

  // Encontra a música pelo id
  const song = songs.find(s => s.id === id);

  if (!song) {
    return res.status(404).json({ error: "Música não encontrada" });
  }

  // Caminho do arquivo txt da música
  const filePath = path.join(__dirname, "../../songs_files", `${id}.txt`);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Erro ao ler arquivo:", err);
      return res.status(500).json({ error: "Erro ao ler conteúdo da música" });
    }

    res.json({ content: data });
  });
};
