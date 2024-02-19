// importar dependencias
const express = require("express");
const check = require("../middlewares/auth");
// cargar Router
const router = express.Router();
// Importar controlador
const ArtistController = require("../controllers/artist");

// Definir rutas
router.get("/prueba-artist", ArtistController.prueba);
router.post("/save", check.auth, ArtistController.save);
router.get("/one/:id", check.auth, ArtistController.one);



// exportar router
module.exports = router;