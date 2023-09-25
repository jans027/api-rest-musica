// importar dependencias
const express = require("express");
// cargar Router
const router = express.Router();
// Importar controlador
const SongController = require("../controllers/song");

// Definir rutas
router.get("/prueba-song", SongController.prueba)

// exportar router
module.exports = router;