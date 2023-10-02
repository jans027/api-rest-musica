// importar dependencias
const express = require("express");
const check = require("../middlewares/auth");
// cargar Router
const router = express.Router();
// Importar controlador
const UserController = require("../controllers/user");

// Definir rutas utiles
router.get("/prueba-user", UserController.prueba);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile/:id", check.auth, UserController.profile);


// exportar router
module.exports = router;