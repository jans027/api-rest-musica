// importar dependencias
const express = require("express");
// cargar Router
const router = express.Router();
// Importar controlador
const AlbumController = require("../controllers/album");

// Definir rutas
router.get("/prueba-album", AlbumController.prueba)

// exportar router
module.exports = router;