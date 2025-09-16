const express = require("express");
const cors = require("cors");
const songsRoutes = require("./routes/songs");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rota base para músicas
app.use("/api/songs", songsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
