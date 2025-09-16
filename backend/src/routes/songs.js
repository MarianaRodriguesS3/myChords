const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

// Rota para listar todas as músicas
router.get("/", songController.getAllSongs);

// Rota para pegar o conteúdo da música (arquivo txt)
router.get("/:id/content", songController.getSongContent);

module.exports = router;
