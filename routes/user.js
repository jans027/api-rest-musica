// importar dependencias
const express = require("express");
// cargar Router
const router = express.Router();
// Importar controlador
const UserController = require("../controllers/user");

// Definir rutas utiles
router.get("/prueba-user", UserController.prueba);
router.get("/register", UserController.register);


// exportar router
module.exports = router;