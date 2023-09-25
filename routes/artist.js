// importar dependencias
const express = require("express");
// cargar Router
const router = express.Router();
// Importar controlador
const ArtistController = require("../controllers/artist");

// Definir rutas
router.get("/prueba-artist", ArtistController.prueba)

// exportar router
module.exports = router;