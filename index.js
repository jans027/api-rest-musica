// Importar conexion a base de datos
const connection = require("./database/connection");
// Importar dependencias
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida 
console.log("API REST con node para la app de musica arrancada!!")

// Ejecutar conexion a la bd
connection();

// Crear servidor de node
const app = express();
const port = 3910;

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cargar configuracion de rutas 
const UserRoutes = require("./routes/user");
const ArtistRoutes = require("./routes/artist");
const SongRoutes = require("./routes/song");
const AlbumRoutes = require("./routes/album");

app.use("/api/user", UserRoutes);
app.use("/api/artist", ArtistRoutes);
app.use("/api/song", SongRoutes);
app.use("/api/album", AlbumRoutes);

// Ruta de prueba
app.get("/ruta-de-prueba", (req, res) => {
    return res.status(200).send("Mensaje de prueba API musica");
});

// Poner el servidor a escuchar peticiones http
app.listen(port, () => {
    console.log(`Servidor de node escuchando en el puerto ${port}`)
})