// importar dependencias
const express = require("express");
// cargar Router
const router = express.Router();
// Importar controlador
const UserController = require("../controllers/user");

// Definir rutas
router.get("/prueba-user", UserController.prueba)

// exportar router
module.exports = router;