// backend/src/server.js

const express = require("express");
const cors = require("cors");
const songsRoutes = require("./routes/songs");
require("dotenv").config();

const app = express();

// CORS config
const allowedOrigins = [
  'https://mychords.onrender.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Suas rotas
app.use("/api/songs", songsRoutes);

// Porta para Render ou local
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
