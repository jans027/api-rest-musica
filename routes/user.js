// importar dependencias
const express = require("express");
const check = require("../middlewares/auth");
// cargar Router
const router = express.Router();
// Importar controlador
const UserController = require("../controllers/user");
 
// Configurar subida de imagenes
const multer = require("multer");
// Definir almacenamiento
const storage = multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null, "./uploads/avatars/");
    },
    filename:(req, file, cb) => {
        cb(null, "avatar-"+Date.now()+"-"+file.originalname);
    }
});
// Aplicando configuracion a multer
const uploads = multer({storage});

// Definir rutas utiles
router.get("/prueba-user", UserController.prueba);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/profile/:id", check.auth, UserController.profile);
router.post("/upload", [check.auth, uploads.single("file0")], UserController.upload);
router.get("/avatar/:file", UserController.avatar);




// exportar router
module.exports = router;